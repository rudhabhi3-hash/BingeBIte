import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MediaSelector from "../components/MediaSelector";
import MoodSelector from "../components/MoodSelector";
import TimeSelector from "../components/TimeSelector";
import RecommendButton from "../components/RecommendButton";
import RecommendationCard from "../components/RecommendationCard";
import Loading from "../components/loading";
import { recommendMovie } from "../api/movie";
import { recommendAnime } from "../api/anime";

function Home() {
  const [selectedMedia, setSelectedMedia] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [error, setError] = useState("");

  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState([]);

  async function handleRecommendation() {

    if (!selectedMood || !selectedMedia) {
        setError("Please select both a media type and a mood.");
        return;
    }

    try {

        setRecommendation(null);
        setReason([]);
        setLoading(true);
        setError("");

        let data;

        // 🍥 Anime
        if (selectedMedia === "anime") {

            data = await recommendAnime(
                selectedMood,
                selectedTime
            );

            if (data.error) {
                setError(data.error);
                return;
            }

            setRecommendation(data.anime);
            setReason(data.reason);
        }

        // 🎬 Movie
        else if (selectedMedia === "movie") {

            data = await recommendMovie(
                selectedMood,
                "movie"
            );

            if (data.error) {
                setError(data.error);
                return;
            }

            setRecommendation(data.movie);
            setReason(data.reason);
        }

        // 📺 TV Shows
        else if (selectedMedia === "tv") {

            data = await recommendMovie(
                selectedMood,
                "tv"
            );

            if (data.error) {
                setError(data.error);
                return;
            }

            setRecommendation(data.movie);
            setReason(data.reason);
        }

    }

    catch (err) {

        console.log(err);

        setError("Something went wrong.");

    }

    finally {

        setLoading(false);

    }

}

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Navbar />

      <Hero />
      <div id="recommend-section">
        <MediaSelector
            selectedMedia={selectedMedia}
            setSelectedMedia={setSelectedMedia}
        />

        <MoodSelector
            selectedMood={selectedMood}
            setSelectedMood={setSelectedMood}
        />

        <TimeSelector
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
        />

        <RecommendButton
            selectedMedia={selectedMedia}
            selectedMood={selectedMood}
            selectedTime={selectedTime}
            onClick={handleRecommendation}
        />
      </div>

      {loading && <Loading />}

      
      {
    error && (
        <div className="mt-10 text-center text-red-400">
            {error}
        </div>
    )
      }
      {recommendation && (
  <RecommendationCard
    anime={recommendation}
    reason={reason}
    onRecommendAgain={handleRecommendation}
  />
)}


    </div>
  );
}

export default Home;