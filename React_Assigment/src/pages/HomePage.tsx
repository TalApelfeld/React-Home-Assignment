import { Link } from "react-router";
import HomePageButton from "../components/Buttons/Homepage/HomePageButton";
import Card from "../components/Cards/HomePage/Card";

export default function HomePage() {
  return (
    <>
      <h1 className="text-h1-sm md:text-h1-md lg:text-h1-lg">
        Experiment Data Collection System
      </h1>
      <h2 className="text-h2-lg text-text-Secondary mb-h2">
        A multi-page experiment tracking user interactions and timing
      </h2>
      {/* Number Of Experiments Conducted Card*/}
      <Card />
      <div className="flex flex-col items-center lg:flex-row lg:gap-4">
        {/* <button className="px-6 py-2 flex gap-2 bg-primary-Action-500 text-Background border border-black rounded-lg mt-h2">
          Start New Experiment
        </button>
        <button className="px-6 py-2 flex gap-2 bg-Background border border-black rounded-[8px] mt-h2 text-text-Primary">
          View Stats
        </button> */}
        <Link to={"/About"}>
          <HomePageButton
            variant="primary"
            icon="/experimentIcon.svg"
            text="Start New Experiment"
          />
        </Link>
        <HomePageButton
          variant="secondary"
          icon="/stats.svg"
          text="View Stats"
        />
      </div>
    </>
  );
}
