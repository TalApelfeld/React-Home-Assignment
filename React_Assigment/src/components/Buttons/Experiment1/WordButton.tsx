interface IWordButtonProps {
  text: string;
}

export default function WordButton({ text }: IWordButtonProps) {
  return (
    <button className="w-50 h-10  border-2 border-neutral-300 rounded-lg">
      {text}
    </button>
  );
}
