import random
import requests

ANILIST_URL = "https://graphql.anilist.co"


MOOD_GENRES = {
    "funny": "Comedy",
    "romance": "Romance",
    "action": "Action",
    "horror": "Horror",
    "feelgood": "Slice of Life",
    "relaxing": "Slice of Life",
    "mindblowing": "Sci-Fi",
    "emotional": "Drama"
}


QUERY = """
query ($genre: String, $page: Int) {

  Page(page: $page, perPage: 50) {

    media(
      type: ANIME
      genre: $genre
      sort: POPULARITY_DESC
      status: FINISHED
    ) {

      id

      title {
        romaji
      }

      coverImage {
        extraLarge
      }

      averageScore

      popularity

      episodes

      duration

      format

      seasonYear

      status

      description(asHtml:false)

      genres

      trailer{
        site
        id
      }

    }

  }

}
"""


def get_recommendation(mood, selected_time):

    genre = MOOD_GENRES.get(mood)
    page = random.randint(1, 8)

    response = requests.post(
        ANILIST_URL,
        json={
            "query": QUERY,
            "variables": {
                "genre": genre,
                "page":page
            }
        },
        timeout=15
    )

    data = response.json()

    anime_list = data["data"]["Page"]["media"]

    filtered = []

    for anime in anime_list:

        duration = anime.get("duration") or 24
        episodes = anime.get("episodes") or 1
        format_type = anime.get("format")

        if selected_time == "20":

            if format_type == "TV" and duration <= 30:
                filtered.append(anime)

        elif selected_time == "40":

            if format_type == "TV" and 20 <= duration <= 30:
                filtered.append(anime)

        elif selected_time == "60":

            if format_type == "TV" and 20 <= duration <= 30:
                filtered.append(anime)

        elif selected_time == "movie":

            if format_type == "MOVIE":
                filtered.append(anime)

    # Fallback if nothing matched
    if len(filtered) == 0:
        filtered = anime_list

    filtered.sort(
        key=lambda x: (
            x.get("averageScore") or 0,
            x.get("popularity") or 0
        ),
        reverse=True
    )

    top = filtered[:20]
    anime = random.choice(top)

    trailer = None

    if anime.get("trailer") and anime["trailer"].get("site") == "youtube":
        trailer = {
            "url": f"https://www.youtube.com/watch?v={anime['trailer']['id']}"
        }

    # Build reasons
    reason = [
        f"Matches your '{mood.title()}' mood 🎭"
    ]

    if selected_time == "20":
        reason.append("Perfect for a quick meal 🍜")

    elif selected_time == "40":
        reason.append("Great for watching 1–2 episodes ⏱️")

    elif selected_time == "60":
        reason.append("Perfect for a longer session 🍿")

    elif selected_time == "movie":
        reason.append("You wanted an anime movie 🎬")

    if anime.get("averageScore"):
        reason.append(f"Rated {anime['averageScore']/10:.1f}⭐ on AniList")

    if anime.get("seasonYear"):
        reason.append(f"Released in {anime['seasonYear']}")

    return {
        "anime": {
            "id": anime["id"],
            "title": anime["title"]["romaji"],
            "score": anime["averageScore"] / 10,
            "episodes": anime["episodes"],
            "year": anime["seasonYear"],
            "status": anime["status"].replace("_", " ").title(),
            "synopsis": anime["description"],
            "images": {
                "jpg": {
                    "large_image_url": anime["coverImage"]["extraLarge"]
                }
            },
            "genres": [
                {
                    "mal_id": i,
                    "name": g
                }
                for i, g in enumerate(anime["genres"])
            ],
            "trailer": trailer
        },
        "reason": reason
    }