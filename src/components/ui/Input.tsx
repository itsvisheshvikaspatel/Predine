import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={`
        w-full
        rounded-xl
        border
        border-gray-300
        bg-white
        px-4
        py-3
        outline-none
        transition-all
        duration-200
        focus:border-emerald2-500
        focus:ring-4
        focus:ring-emerald2-100
        placeholder:text-gray-400
        ${className}
      `}
    />
  );
}