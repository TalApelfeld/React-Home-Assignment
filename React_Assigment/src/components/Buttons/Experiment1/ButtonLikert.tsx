import { ButtonClick } from "../../../styles/styles";

interface IButtonLikertProps {
  text: string;
  selectedNumber: string;
  onSelect: (value: string) => void;
}

export default function ButtonLikert({
  text,
  selectedNumber,
  onSelect,
}: IButtonLikertProps) {
  function handleClick() {
    onSelect(text);
  }

  const isSelected = selectedNumber === text;

  return (
    <button
      className={`w-14 h-14 border-2 border-neutral-300 rounded-full text-text-Primary
         hover:bg-neutral-300  ${ButtonClick} ${
        isSelected ? "bg-neutral-300" : ""
      }`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
