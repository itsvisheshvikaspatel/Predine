import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variants = {
  primary:
    "bg-emerald2-500 hover:bg-emerald2-600 text-white shadow-lg",

  secondary:
    "bg-charcoal-900 hover:bg-charcoal-800 text-white",

  outline:
    "border border-charcoal-300 bg-white hover:bg-charcoal-100 text-charcoal-900",

  danger:
    "bg-red-500 hover:bg-red-600 text-white",
};

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-xl
        px-4
        py-2.5
        font-semibold
        transition-all
        duration-200
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}