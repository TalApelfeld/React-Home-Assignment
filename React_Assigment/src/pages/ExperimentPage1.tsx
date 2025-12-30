import ImageContainer from "../components/Reusable/ImageContainer";
import LikertCard from "../components/Cards/Experiment1Page/LikertCard";
import { useRandomWords } from "../hooks/useRandomWords";
import RandomWordsCard from "../components/Cards/Experiment1Page/RandomWordsCard";
import { Link } from "react-router";
import PrimaryActionButton from "../components/Reusable/PrimaryActionButton";

export default function ExperimentPage1() {
  const { words, loading, error } = useRandomWords();

  return (
    <>
      <span className="mb-h2">Experiment - Page 1 of 3</span>

      {/* Image */}
      <ImageContainer />

      {/* Likert */}
      <LikertCard />

      {/* Random Words */}
      <RandomWordsCard wordsArray={words} />

      {/* Next Button */}
      <Link to={"/ex2"}>
        <div className="pb-12">
          <PrimaryActionButton
            variant="primary"
            text="Continue"
            icon="/next.svg"
          />
        </div>
      </Link>
    </>
  );
}
