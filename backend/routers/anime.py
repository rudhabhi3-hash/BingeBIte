from fastapi import APIRouter

from services.anilist import get_recommendation

router = APIRouter()


@router.get("/recommend")
def recommend(
    mood: str,
    time: str
):
    try:

        data = get_recommendation(
            mood,
            time
        )

        return data

    except Exception as e:

        print("AniList Error:", e)

        return {
            "error": "AniList is temporarily unavailable. Please try again."
        }