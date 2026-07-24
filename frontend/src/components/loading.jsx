function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">

      <div className="h-16 w-16 animate-spin rounded-full border-4 border-zinc-700 border-t-violet-500"></div>

      <h2 className="mt-6 text-2xl font-semibold">
        Finding your perfect recommendation...
      </h2>

      <p className="mt-2 text-zinc-400">
        This will only take a moment 🍿
      </p>

    </div>
  );
}

export default Loading;