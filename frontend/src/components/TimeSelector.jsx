const times = [
  {
    id: "20",
    title: "20 min",
    subtitle: "Quick Watch",
  },
  {
    id: "40",
    title: "40 min",
    subtitle: "1–2 Episodes",
  },
  {
    id: "60",
    title: "1 Hour",
    subtitle: "Long Session",
  },
  {
    id: "movie",
    title: "Movie",
    subtitle: "Feature Length",
  },
];

function TimeSelector({ selectedTime, setSelectedTime }) {
  return (
    <section className="mt-24 px-6">
      <h2 className="text-center text-3xl font-bold">
        How much time do you have?
      </h2>

      <p className="mt-3 text-center text-zinc-400">
        We'll recommend something that fits your schedule.
      </p>

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-4">
        {times.map((time) => (
          <button
            key={time.id}
            onClick={() => setSelectedTime(time.id)}
            className={`rounded-2xl border p-6 transition-all duration-300
              ${
                selectedTime === time.id
                  ? "border-violet-500 bg-violet-600/20 scale-105 shadow-[0_0_35px_rgba(139,92,246,0.35)]"
                  : "border-zinc-800 bg-zinc-900 hover:border-violet-500 hover:scale-105"
              }`}
          >
            <h3 className="text-2xl font-bold">{time.title}</h3>

            <p className="mt-2 text-zinc-400">
              {time.subtitle}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default TimeSelector;