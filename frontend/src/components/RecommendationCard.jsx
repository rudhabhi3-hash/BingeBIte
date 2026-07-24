import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

import {
  saveFavorite,
  removeFavorite,
  isFavorite,
} from "../utils/favorites";

function RecommendationCard({ anime, reason, onRecommendAgain }) {
  const isAnime = anime.images !== undefined;

  const poster = isAnime
    ? anime.images.jpg.large_image_url
    : `https://image.tmdb.org/t/p/w500${anime.poster_path}`;

  const title = isAnime
    ? anime.title
    : anime.title || anime.name;

  const rating = isAnime
    ? anime.score
    : anime.vote_average?.toFixed(1);

  const description = isAnime
    ? anime.synopsis
    : anime.overview;

  const release = isAnime
    ? anime.year
    : anime.release_date || anime.first_air_date;

  const id = anime.id;

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (id) {
      setSaved(isFavorite(id));
    }
  }, [id]);

  function toggleFavorite() {
    if (saved) {
      removeFavorite(id);
      setSaved(false);
      return;
    }

    saveFavorite({
      id,
      title,
      poster,
      rating,
      type: isAnime
        ? "anime"
        : anime.first_air_date
        ? "tv"
        : "movie",
    });

    setSaved(true);
  }

  return (
    <section className="mx-auto mb-20 mt-16 max-w-6xl rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

      {/* Why Recommendation */}
      <div className="mb-8 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">

        <h3 className="text-lg font-bold text-violet-300">
          ✨ Why this recommendation?
        </h3>

        <div className="mt-4 space-y-2">
          {reason.map((item, index) => (
            <p key={index} className="text-zinc-300">
              • {item}
            </p>
          ))}
        </div>

      </div>

      <div className="flex flex-col gap-8 md:flex-row">

        {/* Poster */}
        <div className="relative">

          <img
            src={poster}
            alt={title}
            className="h-[450px] w-72 rounded-2xl object-cover shadow-xl"
          />

          <button
            onClick={toggleFavorite}
            className="absolute right-3 top-3 rounded-full bg-black/60 p-3 backdrop-blur-md transition hover:scale-110"
          >
            <Heart
              size={22}
              fill={saved ? "currentColor" : "none"}
              className={
                saved
                  ? "text-pink-500"
                  : "text-white"
              }
            />
          </button>

        </div>

        {/* Details */}
        <div className="flex-1">

          <h2 className="text-5xl font-bold">
            {title}
          </h2>

          <div className="mt-5 flex flex-wrap gap-6 text-zinc-300">

            <span>⭐ {rating}</span>

            <span>📅 {release || "Unknown"}</span>

          </div>

          {/* Anime Details */}
          {isAnime && (
            <>
              <div className="mt-3 flex flex-wrap gap-6 text-zinc-400">

                <span>
                  📺 {anime.episodes ?? "Unknown"} Episodes
                </span>

                <span>{anime.status}</span>

              </div>

              <div className="mt-6 flex flex-wrap gap-2">

                {anime.genres.map((genre) => (
                  <span
                    key={genre.mal_id}
                    className="rounded-full bg-violet-600/20 px-4 py-2 text-sm"
                  >
                    {genre.name}
                  </span>
                ))}

              </div>
            </>
          )}

          {/* Movie / TV Genres */}
          {!isAnime && anime.genre_names && (
            <div className="mt-6 flex flex-wrap gap-2">

              {anime.genre_names.map((genre) => (
                <span
                  key={genre}
                  className="rounded-full bg-violet-600/20 px-4 py-2 text-sm"
                >
                  {genre}
                </span>
              ))}

            </div>
          )}

          {/* Description */}
          <p className="mt-8 max-h-64 overflow-y-auto pr-2 leading-8 text-zinc-300">
            {description}
          </p>

          {/* Trailer */}
          {isAnime && anime.trailer?.url && (
            <a
              href={anime.trailer.url}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-500"
            >
              ▶ Watch Trailer
            </a>
          )}

          {/* Recommend Again */}
          <div className="mt-8">

            <button
              onClick={onRecommendAgain}
              className="rounded-xl bg-violet-600 px-6 py-3 font-semibold transition hover:bg-violet-500"
            >
              🔄 Recommend Again
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default RecommendationCard;