import { ButtonClick } from "../../../styles/styles";

interface IWordButtonProps {
  text: string;
  selectedWord: string;
  onSelect: (word: string) => void;
}

export default function WordButton({
  text,
  selectedWord,
  onSelect,
}: IWordButtonProps) {
  function handleClick() {
    onSelect(text);
  }

  const isSelected = selectedWord === text;

  return (
    <button
      className={`px-4 py-2 min-w-25 border-2 border-neutral-300 rounded-lg 
        hover:bg-neutral-200 active:bg-neutral-300 ${ButtonClick} ${
        isSelected
          ? "bg-primary-Action-500 text-white border-primary-Action-500"
          : ""
      }`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
