import { useState } from "react";
import WordButton from "../../Buttons/Experiment1/WordButton";

interface IRandomWordsCardProps {
  wordsArray: string[];
}

export default function RandomWordsCard({ wordsArray }: IRandomWordsCardProps) {
  const [selectedWord, setSelectedWord] = useState<string>("");

  return (
    <div className="w-[95%] lg:w-[50%] flex justify-center items-center gap-4 border-2 border-neutral-300 p-4 rounded-lg">
      {wordsArray.map((word: string) => (
        <WordButton
          key={word}
          text={word}
          selectedWord={selectedWord}
          setSelectedWord={setSelectedWord}
        />
      ))}
    </div>
  );
}
