import { useEffect, useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(saved);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-8 py-10">

      <h1 className="text-4xl font-bold mb-8">
        ❤️ Your Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-zinc-400">
          You haven't saved anything yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-4 gap-8">

          {favorites.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800"
            >
              <img
                src={item.poster}
                className="w-full h-80 object-cover"
              />

              <div className="p-4">

                <h2 className="font-bold">
                  {item.title}
                </h2>

                <p className="text-zinc-400 mt-2">
                  ⭐ {item.rating}
                </p>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Favorites;