import { Link } from "react-router";
import HomePageButton from "../components/Reusable/PrimaryActionButton";
import AboutCard from "../components/Cards/IntroductoryPage/AboutCard";
import ExperimentStageCard from "../components/Cards/IntroductoryPage/ExperimentStageCard";
import ImportantInformationCard from "../components/Cards/IntroductoryPage/ImportantInformationCard";

export default function Introductory() {
  return (
    <>
      {/* Welcome Titles */}
      <div className="px-6">
        <h1 className="text-h1-xsm lg:text-h1-md text-text-Primary">
          Welcome to Our Research Experiment
        </h1>
        <h2 className="text-h2-sm lg:text-h2-md text-text-Secondary mb-h2">
          Thank you for participating in this study. Your contribution will help
          us understand how people interact with digital interfaces and make
          decisions in real-time.
        </h2>
      </div>

      {/* About */}
      <AboutCard />

      {/* Experiment Stages */}
      <div className=" text-start mb-h2">
        <h1 className="text-h1-xsm">Experiment Stages</h1>
        <div className="flex flex-col lg:flex-row gap-4">
          <ExperimentStageCard
            icon="/click.svg"
            title="Stage 1: Image Rating"
            text="You will view an image and rate your response on a scale of 1-4. You'll also select from three randomly generated words. We'll measure your response times and choices."
          />
          <ExperimentStageCard
            icon="/clock.svg"
            title="Stage 2: Interaction Task"
            text="Complete a simple clicking task by filling a visual counter to 10 clicks. This measures your interaction speed and consistency across repeated actions."
          />
          <ExperimentStageCard
            icon="/check.svg"
            title="Stage 3: Results"
            text="View a detailed summary of your interaction data, including timestamps and timing measurements collected throughout the experiment."
          />
        </div>
      </div>

      {/* Inforamtion Card */}
      <ImportantInformationCard />

      {/* Start Button */}
      <div className="pb-12">
        <Link to={"/ex1"}>
          <HomePageButton
            variant="primary"
            icon="start.svg"
            text="Begin Experiment"
          />
        </Link>
      </div>
    </>
  );
}
