function Hero() {

  function scrollToRecommendation() {
    const section = document.getElementById("recommend-section");

    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <section className="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-6">

      {/* Background Glow */}
      <div className="absolute h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl text-center">

        <h1 className="text-5xl font-black leading-tight text-white md:text-7xl">
          Stop Scrolling.
          <br />
          <span className="text-violet-500">Start Watching.</span>
        </h1>

        <p className="mt-8 text-lg text-zinc-400 md:text-2xl">
          Discover anime, movies and TV shows perfectly matched
          <br />
          to your mood in under 10 seconds.
        </p>

        <button
          onClick={scrollToRecommendation}
          className="mt-10 rounded-2xl bg-violet-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-violet-500 active:scale-95"
        >
          Get Started →
        </button>

      </div>

    </section>
  );
}

export default Hero;