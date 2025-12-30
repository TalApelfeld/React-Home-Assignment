interface IButtonLikertProps {
  text: string;
}

export default function ButtonLikert({ text }: IButtonLikertProps) {
  return (
    <button className="w-14 h-14 border-2 border-neutral-300 rounded-full text-text-Primary">
      {text}
    </button>
  );
}
