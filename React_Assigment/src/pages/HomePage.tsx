import { Link } from "react-router";
import HomePageButton from "../components/Reusable/PrimaryActionButton";
import Card from "../components/Cards/HomePage/Card";

export default function HomePage() {
  return (
    <>
      {/* Welcom Titles */}
      <h1 className="text-h1-sm md:text-h1-md lg:text-h1-lg">
        Experiment Data Collection System
      </h1>
      <h2 className="text-h2-lg text-text-Secondary mb-12">
        A multi-page experiment tracking user interactions and timing
      </h2>

      {/* Number Of Experiments Conducted Card*/}
      <Card />

      {/* Buttons */}
      <div className="flex flex-col items-center lg:flex-row lg:gap-4 mx-auto">
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
