import WordButton from "../../Buttons/Experiment1/WordButton";

interface IRandomWordsCardProps {
  wordsArray: string[];
}

export default function RandomWordsCard({ wordsArray }: IRandomWordsCardProps) {
  return (
    <div className="w-[90%] flex justify-center items-center gap-4 border-2 border-neutral-300 p-4 rounded-lg">
      {wordsArray.map((word: string) => (
        <WordButton key={word} text={word} />
      ))}
    </div>
  );
}
