import type { ButtonHTMLAttributes } from "react";
// import experiment from "../../../";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  icon?: string;
  text: string;
}

export default function PrimaryActionButton({
  variant = "primary",
  icon,
  text,
}: ButtonProps) {
  const baseStyles =
    "px-6 py-2 flex gap-2 border border-black rounded-lg mt-h2 items-center";

  const variantStyles = {
    primary: "bg-primary-Action-500 text-Background-50",
    secondary: "bg-Background-50 text-text-Primary",
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`}>
      {text}
      <img src={icon} alt="icon" className="w-6 h-6" />
    </button>
  );
}
