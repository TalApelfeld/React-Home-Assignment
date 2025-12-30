import WordButton from "../../Buttons/Experiment1/WordButton";
import { useExperiment } from "../../../hooks/useExperiment";

interface IRandomWordsCardProps {
  wordsArray: string[];
}

export default function RandomWordsCard({ wordsArray }: IRandomWordsCardProps) {
  const { data, recordWordClick } = useExperiment();
  const selectedWord = data.page1.selectedWord;

  const handleWordSelect = (word: string) => {
    recordWordClick(word);
  };

  return (
    <div className="w-[95%] lg:w-[50%] flex flex-col justify-center items-center gap-4 border-2 border-neutral-300 p-4 rounded-lg">
      <h2 className="text-h2-md text-text-Secondary">
        Select one of the words below
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {wordsArray.map((word: string) => (
          <WordButton
            key={word}
            text={word}
            selectedWord={selectedWord || ""}
            onSelect={handleWordSelect}
          />
        ))}
      </div>
    </div>
  );
}
