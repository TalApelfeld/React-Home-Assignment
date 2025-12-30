import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import ImageContainer from "../components/Reusable/ImageContainer";
import LikertCard from "../components/Cards/Experiment1Page/LikertCard";
import RandomWordsCard from "../components/Cards/Experiment1Page/RandomWordsCard";
import PrimaryActionButton from "../components/Reusable/PrimaryActionButton";
import { useRandomWords } from "../hooks/useRandomWords";
import { useExperiment } from "../hooks/useExperiment";
import { useFirstClick } from "../hooks/useFirstClick";
import { useBlockNavigation } from "../hooks/useBlockNavigation";
import ReturnHomeButton from "../components/Buttons/ReturnHomeButton";

export default function ExperimentPage1() {
  const navigate = useNavigate();
  const { words, loading, error } = useRandomWords();
  const {
    stage,
    recordPage1FirstClick,
    recordPage1Submit,
    goToPage2,
    canProceedFromPage1,
  } = useExperiment();
  const isFormValid = canProceedFromPage1();

  // Block navigation - only allow Continue (/ex2) or Return Home (/)
  useBlockNavigation(["/ex2", "/"]);

  // Track first click on this page
  useFirstClick(recordPage1FirstClick);

  // Redirect if accessing page when not on the right stage
  useEffect(() => {
    if (stage !== "page1") {
      navigate("/");
    }
  }, [navigate]);

  const handleContinue = () => {
    if (!isFormValid) {
      alert("Please select a rating and a word before continuing.");
      return;
    }
    recordPage1Submit();
    goToPage2();
  };

  return (
    <>
      <span className="mb-h2">Experiment - Page 1 of 3</span>

      {/* Image */}
      <ImageContainer />

      {/* Likert */}
      <LikertCard />

      {/* Random Words */}
      {loading ? (
        <div className="w-[95%] lg:w-[50%] flex justify-center items-center gap-4 border-2 border-neutral-300 p-4 rounded-lg">
          <span className="text-text-Secondary">Loading words...</span>
        </div>
      ) : error ? (
        <div className="w-[95%] lg:w-[50%] flex justify-center items-center gap-4 border-2 border-red-300 p-4 rounded-lg">
          <span className="text-red-500">
            Failed to load words. Please refresh.
          </span>
        </div>
      ) : (
        <RandomWordsCard wordsArray={words} />
      )}

      {/* Next Button */}
      <div className="flex gap-4 pb-12">
        {isFormValid ? (
          <>
            <ReturnHomeButton />

            <Link to="/ex2" onClick={handleContinue}>
              <PrimaryActionButton
                variant="primary"
                text="Continue"
                icon="/next.svg"
              />
            </Link>
          </>
        ) : (
          <div className="opacity-50 cursor-not-allowed">
            <PrimaryActionButton
              variant="primary"
              text="Continue"
              icon="/next.svg"
            />
          </div>
        )}
      </div>

      {/* Validation hint */}
      {!isFormValid && (
        <p className="text-text-Secondary text-h2-sm -mt-8 pb-8">
          Please select a rating (1-4) and a word to continue
        </p>
      )}
    </>
  );
}
