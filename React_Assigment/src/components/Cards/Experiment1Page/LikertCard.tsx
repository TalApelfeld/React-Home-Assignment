import { useState } from "react";
import ButtonLikert from "../../Buttons/Experiment1/ButtonLikert";
const buttons = ["1", "2", "3", "4"];

export default function LikertCard() {
  const [selectedNumber, setSelectedNumber] = useState<string>("");

  return (
    <div className="w-[90%] lg:w-[50%] flex flex-col justify-center items-center border-2 border-neutral-300 p-4 rounded-lg mb-h2">
      <div className="flex gap-4 mb-4">
        {buttons.map((value: string) => (
          <ButtonLikert
            key={value}
            text={value}
            setSelectedNumber={setSelectedNumber}
            selectedNumber={selectedNumber}
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
