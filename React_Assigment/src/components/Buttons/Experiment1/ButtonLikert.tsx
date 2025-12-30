import type { Dispatch, SetStateAction } from "react";
import { ButtonClick } from "../../../styles/styles";

interface IButtonLikertProps {
  text: string;
  selectedNumber: string;
  setSelectedNumber: Dispatch<SetStateAction<string>>;
}

export default function ButtonLikert({
  text,
  selectedNumber,
  setSelectedNumber,
}: IButtonLikertProps) {
  function handleSelectedNumber() {
    setSelectedNumber(text);
  }

  return (
    <button
      className={`w-14 h-14 border-2 border-neutral-300 rounded-full text-text-Primary
         active:bg-neutral-300 ${ButtonClick} ${
        selectedNumber === text ? "bg-neutral-300" : ""
      }`}
      onClick={handleSelectedNumber}
    >
      {text}
    </button>
  );
}
