import { Link, useNavigate } from "react-router";
import PrimaryActionButton from "../components/Reusable/PrimaryActionButton";
import { ButtonClick } from "../styles/styles";
import { useExperiment } from "../hooks/useExperiment";
import { useFirstClick } from "../hooks/useFirstClick";
import { BUCKET_MAX_CLICKS } from "../utils/constants";
import { useEffect } from "react";
import ReturnHomeButton from "../components/Buttons/ReturnHomeButton";

export default function ExperimentPage2() {
  const {
    stage,
    data,
    recordPage2FirstClick,
    recordBucketClick,
    recordPage2Submit,
    goToPage3,
  } = useExperiment();

  const navigate = useNavigate();

  // Redirect if accessing page out of order
  useEffect(() => {
    if (stage !== "page2") {
      navigate("/");
    }
  }, [navigate]);

  const bucketClicks = data.page2.bucketClicks;
  const counter = bucketClicks.length;
  const fillPercentage = (counter / BUCKET_MAX_CLICKS) * 100;
  const isBucketFull = counter >= BUCKET_MAX_CLICKS;

  // Track first click on this page
  useFirstClick(recordPage2FirstClick);

  function handleBucketClick() {
    if (counter < BUCKET_MAX_CLICKS) {
      recordBucketClick();
    }
  }

  function handleSubmit() {
    recordPage2Submit();
    goToPage3();
  }

  return (
    <>
      <span className="mb-h2">Experiment - Page 2 of 3</span>

      <div className="w-[90%] lg:w-[50%] flex flex-col items-center bg-neutral-100 rounded-lg p-4 border-2 border-neutral-400">
        <h2 className="text-h2-xl">Fill the bucket</h2>
        <h2 className="mb-h2 text-h2-md text-text-Secondary">
          Click {BUCKET_MAX_CLICKS} times to continue
        </h2>

        {/* Bucket container */}
        <div
          className={`relative w-[80%] h-75 bg-neutral-200 border-2 border-neutral-300 rounded-lg cursor-pointer select-none ${ButtonClick} ${
            isBucketFull ? "cursor-default" : "hover:border-primary-Action-500"
          }`}
          onClick={handleBucketClick}
        >
          {/* drop & counter */}
          <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
            <img src="/drop.svg" alt="drop icon" className="w-12 h-12" />
            <span className="text-h1-sm font-bold">{counter}</span>
          </div>

          {/* Fill div */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-primary-Action-500 transition-all duration-300 rounded-b-lg"
            style={{ height: `${fillPercentage}%` }}
          />
        </div>
      </div>

      {/* Continue button */}
      {isBucketFull && (
        <div className=" flex gap-4">
          <ReturnHomeButton />
          <Link to="/stats" onClick={handleSubmit}>
            <PrimaryActionButton
              variant="primary"
              text="Continue"
              icon="/next.svg"
            />
          </Link>
        </div>
      )}

      {/* Hint when not full */}
      {!isBucketFull && (
        <p className="text-text-Secondary text-h2-sm mt-4">
          {BUCKET_MAX_CLICKS - counter} more clicks to go
        </p>
      )}
    </>
  );
}
