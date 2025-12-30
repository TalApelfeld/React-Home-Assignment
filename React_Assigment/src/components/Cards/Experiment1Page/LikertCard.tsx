import ButtonLikert from "../../Buttons/Experiment1/ButtonLikert";
import { useExperiment } from "../../../hooks/useExperiment";
import { LIKERT_SCALE } from "../../../utils/constants";

export default function LikertCard() {
  const { data, recordLikertClick } = useExperiment();
  const selectedNumber = data.page1.selectedLikertValue;

  const handleLikertSelect = (value: string) => {
    recordLikertClick(value);
  };

  return (
    <div className="w-[90%] lg:w-[50%] flex flex-col justify-center items-center border-2 border-neutral-300 p-4 rounded-lg mb-h2">
      <h2 className="text-h2-md text-text-Secondary mb-4">
        Rate your response to the image
      </h2>
      <div className="flex gap-4 mb-4">
        {LIKERT_SCALE.VALUES.map((value: string) => (
          <ButtonLikert
            key={value}
            text={value}
            selectedNumber={selectedNumber || ""}
            onSelect={handleLikertSelect}
          />
        ))}
      </div>
      <div className="w-full flex justify-between">
        <span className="text-h2-sm">Strongly Disagree</span>
        <span className="text-h2-sm">Strongly Agree</span>
      </div>
    </div>
  );
}
