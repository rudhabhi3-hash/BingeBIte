const mediaTypes = [
  {
    id: "anime",
    emoji: "🎌",
    title: "Anime",
    subtitle: "Series & Movies",
  },
  {
    id: "movie",
    emoji: "🎬",
    title: "Movies",
    subtitle: "Hollywood & More",
  },
  {
    id: "tv",
    emoji: "📺",
    title: "TV Shows",
    subtitle: "Series & Sitcoms",
  },
];

function MediaSelector({ selectedMedia, setSelectedMedia }) {
  return (
    <section className="mt-16 px-6">
      <h2 className="text-center text-3xl font-bold">
        Choose what you want to watch
      </h2>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">

        {mediaTypes.map((media) => (
          <button
            key={media.id}
            onClick={() => setSelectedMedia(media.id)}
            className={`rounded-2xl border p-8 transition-all duration-300

            ${
              selectedMedia === media.id
                ? "border-violet-500 bg-violet-600/20 scale-105 shadow-[0_0_40px_rgba(139,92,246,0.3)]"
                : "border-zinc-800 bg-zinc-900 hover:border-violet-500 hover:scale-105"
            }`}
          >
            <div className="text-6xl">{media.emoji}</div>

            <h3 className="mt-4 text-2xl font-bold">
              {media.title}
            </h3>

            <p className="mt-2 text-zinc-400">
              {media.subtitle}
            </p>
          </button>
        ))}

      </div>
    </section>
  );
}

export default MediaSelector;