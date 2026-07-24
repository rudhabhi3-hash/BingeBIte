const moods = [
  {
    id: "feelgood",
    emoji: "😊",
    title: "Feel Good",
    subtitle: "Light-hearted & wholesome",
  },
  {
    id: "funny",
    emoji: "😂",
    title: "Funny",
    subtitle: "Laugh out loud",
  },
  {
    id: "action",
    emoji: "😎",
    title: "Action",
    subtitle: "Fast-paced & thrilling",
  },
  {
    id: "romance",
    emoji: "❤️",
    title: "Romance",
    subtitle: "Love stories",
  },
  {
    id: "emotional",
    emoji: "😭",
    title: "Emotional",
    subtitle: "Touching moments",
  },
  {
    id: "relaxing",
    emoji: "😌",
    title: "Relaxing",
    subtitle: "Calm & cozy",
  },
  {
    id: "mindblowing",
    emoji: "🤯",
    title: "Mind-blowing",
    subtitle: "Unexpected twists",
  },
  {
    id: "horror",
    emoji: "👻",
    title: "Horror",
    subtitle: "Scary & suspenseful",
  },
];

function MoodSelector({ selectedMood, setSelectedMood }) {
  return (
    <section className="mt-24 px-6">
      <h2 className="text-center text-3xl font-bold">
        What's your mood today?
      </h2>

      <p className="mt-3 text-center text-zinc-400">
        Pick the vibe you're looking for.
      </p>

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-4">

        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => setSelectedMood(mood.id)}
            className={`rounded-2xl border p-6 text-left transition-all duration-300

            ${
              selectedMood === mood.id
                ? "border-violet-500 bg-violet-600/20 scale-105 shadow-[0_0_35px_rgba(139,92,246,0.35)]"
                : "border-zinc-800 bg-zinc-900 hover:border-violet-500 hover:scale-105"
            }`}
          >
            <div className="text-5xl">
              {mood.emoji}
            </div>

            <h3 className="mt-5 text-xl font-bold">
              {mood.title}
            </h3>

            <p className="mt-2 text-sm text-zinc-400">
              {mood.subtitle}
            </p>

          </button>
        ))}

      </div>
    </section>
  );
}

export default MoodSelector;