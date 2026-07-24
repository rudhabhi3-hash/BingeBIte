from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.movie import router as movie_router

from routers.anime import router as anime_router

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://bingebite-mocha.vercel.app",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    anime_router,
    prefix="/anime",
    tags=["Anime"]
)
app.include_router(
    movie_router,
    prefix="/movie",
    tags=["Movie"]
)


@app.get("/")
def home():
    return {
        "message": "Welcome to BingeBite!"
    }