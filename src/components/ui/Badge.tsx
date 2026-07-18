import type { HTMLAttributes, ReactNode } from "react";

type Variant =
  | "success"
  | "warning"
  | "danger"
  | "neutral"
  | "primary";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  children: ReactNode;
}

const variants = {
  success: "bg-green-100 text-green-700",

  warning: "bg-yellow-100 text-yellow-700",

  danger: "bg-red-100 text-red-700",

  neutral: "bg-gray-100 text-gray-700",

  primary: "bg-emerald2-100 text-emerald2-700",
};

export default function Badge({
  variant = "primary",
  children,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}