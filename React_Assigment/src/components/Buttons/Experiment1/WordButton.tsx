import type { Dispatch, SetStateAction } from "react";
import { ButtonClick } from "../../../styles/styles";

interface IWordButtonProps {
  text: string;
  selectedWord: string;
  setSelectedWord: Dispatch<SetStateAction<string>>;
}

export default function WordButton({
  text,
  selectedWord,
  setSelectedWord,
}: IWordButtonProps) {
  function handleSelectedWord() {
    setSelectedWord(text);
  }
  return (
    <button
      className={`w-32 h-10  border-2 border-neutral-300 rounded-lg ${ButtonClick} ${
        selectedWord === text ? "bg-neutral-300" : ""
      }`}
      onClick={handleSelectedWord}
    >
      {text}
    </button>
  );
}
