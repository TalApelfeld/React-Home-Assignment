import { useState } from "react";
import PrimaryActionButton from "../components/Reusable/PrimaryActionButton";
import { Link } from "react-router";
import { ButtonClick } from "../styles/styles";
const MAX_CLICKS = 10;
export default function ExperimentPage2() {
  const [counter, setCounter] = useState(0);

  const fillPercentage = (counter / MAX_CLICKS) * 100;

  function handleBucketClick() {
    if (counter < MAX_CLICKS) setCounter((prev) => prev + 1);
    else setCounter(counter);
  }

  return (
    <>
      <span className="mb-h2">Experiment - Page 2 of 3</span>

      <div className=" w-[90%] lg:w-[50%] flex flex-col items-center bg-neutral-100 rounded-lg p-4 border-2 border-neutral-400">
        <h2 className="text-h2-xl ">Fill the bucket</h2>
        <h2 className="mb-h2 text-h2-md text-text-Secondary">
          Click 10 times to continue
        </h2>

        {/* Bucket container */}
        <div
          className={`relative w-[80%] h-75 bg-neutral-200 border-2 border-neutral-300 rounded-lg ${ButtonClick}`}
          onClick={handleBucketClick}
        >
          {/* drop & counter */}
          <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <img src="/drop.svg" alt="drop icon" className="w-12 h-12" />
            <span>{counter}</span>
          </div>

          {/* Fill div */}
          <div
            className="absolute bottom-0 left-0 right-0 bg-primary-Action-500 transition-all duration-300 rounded-lg"
            style={{ height: `${fillPercentage}%` }}
          />
        </div>
      </div>

      {/* Continue button */}
      {counter === MAX_CLICKS ? (
        <Link to={"/stats"}>
          <PrimaryActionButton
            variant="primary"
            text="Continue"
            icon="/next.svg"
          />
        </Link>
      ) : (
        ""
      )}
    </>
  );
}
