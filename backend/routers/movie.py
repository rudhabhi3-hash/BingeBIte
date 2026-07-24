from fastapi import APIRouter

from config.movie_genres import MOVIE_GENRES
from config.tv_genres import TV_GENRES
from services.tmdb import discover, get_genre_map

router = APIRouter()


@router.get("/recommend")
def recommend(mood: str, media: str):

    genre_map = get_genre_map(media)

    if not genre_map:
        return {
            "error": "Couldn't fetch genres from TMDB."
        }

    if media == "movie":
        genre_names = MOVIE_GENRES.get(mood)
    else:
        genre_names = TV_GENRES.get(mood)

    if not genre_names:
        return {
            "error": "Unknown mood."
        }

    genre_ids = []

    for genre in genre_names:

        if genre in genre_map:
            genre_ids.append(
                genre_map[genre]
            )

    if len(genre_ids) == 0:

        return {
            "error": "No matching genres found."
        }

    recommendation = discover(
        media,
        genre_ids
    )

    if recommendation is None:

        return {
            "error": "No recommendation found."
        }

    reason = []

    reason.append(
        f"Matches your '{mood.title()}' mood 🎭"
    )

    if recommendation.get("vote_average", 0) >= 8:

        reason.append(
            f"Highly rated ({recommendation['vote_average']}⭐)"
        )

    if recommendation.get("vote_count", 0) >= 5000:

        reason.append(
            "Loved by thousands of viewers ❤️"
        )

    if media == "movie":

        reason.append(
            "Perfect for your movie session 🍿"
        )

    else:

        reason.append(
            "Great TV show to binge 📺"
        )

    return {
        "movie": recommendation,
        "reason": reason
    }