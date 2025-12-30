import type { ButtonHTMLAttributes } from "react";
import { ButtonClick } from "../../styles/styles";

type Direction = "Left" | "Right";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  icon?: string;
  text: string;
  direction?: Direction;
}

export default function PrimaryActionButton({
  variant = "primary",
  icon,
  text,
  direction,
}: ButtonProps) {
  const baseStyles =
    "px-6 py-2 flex gap-2 border border-black rounded-lg mt-h2 items-center";

  const variantStyles = {
    primary: `bg-primary-Action-500 text-Background-50 hover:bg-primary-Action-600 active:bg-primary-Action-600 ${ButtonClick}`,
    secondary: `bg-Background-50 text-text-Primary hover:bg-neutral-200 active:bg-neutral-200 ${ButtonClick}`,
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} `}>
      {direction ? (
        direction === "Left" ? (
          <>
            <img src={icon} alt="icon" className="w-6 h-6" />
            {text}
          </>
        ) : (
          <>
            {text}
            <img src={icon} alt="icon" className="w-6 h-6" />
          </>
        )
      ) : (
        <>
          {text}
          <img src={icon} alt="icon" className="w-6 h-6" />
        </>
      )}
    </button>
  );
}
