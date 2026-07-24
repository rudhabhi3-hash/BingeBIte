function RecommendButton({
  selectedMedia,
  selectedMood,
  selectedTime,
  onClick,
}) {
  const isReady =
    selectedMedia &&
    selectedMood &&
    selectedTime;

  return (
    <div className="my-20 flex justify-center">

      <button
        disabled={!isReady}
        onClick={onClick}
        className={`rounded-xl px-10 py-4 text-lg font-semibold transition-all duration-300

        ${
          isReady
            ? "bg-violet-600 hover:bg-violet-500 hover:scale-105 shadow-lg"
            : "cursor-not-allowed bg-zinc-800 text-zinc-500"
        }`}
      >
        🍿 Recommend Me Something
      </button>

    </div>
  );
}

export default RecommendButton;