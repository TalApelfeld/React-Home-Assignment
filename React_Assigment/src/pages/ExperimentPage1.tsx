import ImageContainer from "../components/Reusable/ImageContainer";
import LikertCard from "../components/Cards/Experiment1Page/LikertCard";
import { useRandomWords } from "../hooks/useRandomWords";
import RandomWordsCard from "../components/Cards/Experiment1Page/RandomWordsCard";
import { Link } from "react-router";

export default function ExperimentPage1() {
  const { words, loading, error } = useRandomWords();

  return (
    <>
      <span className="mb-h2">Experiment - Page 1 of 3</span>

      {/* Image */}
      <ImageContainer />

      {/* TODO: make the buttons in Likert render with map function */}
      {/* Likert */}
      <LikertCard />

      {/* Random Words */}
      <RandomWordsCard wordsArray={words} />

      {/* Next Button */}
      <Link to={"/ex2"}>
        <button className="px-6 py-2 flex gap-2 border border-black rounded-lg mt-h2 items-center bg-primary-Action-500 text-Background-50">
          Continue
          <img src="/next.svg" alt="icon" className="w-6 h-6" />
        </button>
      </Link>
    </>
  );
}
