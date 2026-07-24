import os
import random
import requests
from dotenv import load_dotenv
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

load_dotenv()

API_KEY = os.getenv("TMDB_API_KEY")
BASE_URL = "https://api.themoviedb.org/3"

# Create a reusable session with retries
session = requests.Session()

retries = Retry(
    total=3,
    backoff_factor=1,
    status_forcelist=[429, 500, 502, 503, 504],
)

session.mount("https://", HTTPAdapter(max_retries=retries))


def get_genre_map(media_type):
    """
    Returns:
    {
        "Action":28,
        "Comedy":35
    }
    """

    endpoint = "movie" if media_type == "movie" else "tv"

    url = f"{BASE_URL}/genre/{endpoint}/list"

    try:

        response = session.get(
            url,
            params={
                "api_key": API_KEY
            },
            timeout=10
        )

        response.raise_for_status()

        data = response.json()

        return {
            genre["name"]: genre["id"]
            for genre in data.get("genres", [])
        }

    except Exception as e:

        print("Genre Error:", e)

        return {}


def discover(media_type, genre_ids):
    """
    Returns ONE random movie/tv show
    """

    endpoint = "movie" if media_type == "movie" else "tv"

    url = f"{BASE_URL}/discover/{endpoint}"

    try:

        response = session.get(
            url,
            params={
                "api_key": API_KEY,
                "with_genres": ",".join(map(str, genre_ids)),
                "sort_by": "vote_average.desc",
                "vote_count.gte": 1000,
                "include_adult": False,
                "language": "en-US",
                "page": random.randint(1, 5),
            },
            timeout=10,
        )

        response.raise_for_status()

        data = response.json()

        results = data.get("results", [])

        if len(results) == 0:
            return None

        return random.choice(results)

    except Exception as e:

        print("Discover Error:", e)

        return None