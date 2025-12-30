import HomePageButton from "../components/Buttons/HomePageButton";
import Card from "../components/Card";

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
        <HomePageButton
          variant="primary"
          icon="/experimentIcon.svg"
          text="Start New Experiment"
        />
        <HomePageButton
          variant="secondary"
          icon="/stats.svg"
          text="View Stats"
        />
      </div>
    </>
  );
}
