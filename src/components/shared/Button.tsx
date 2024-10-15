import { cn } from "@utils/cn";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  theme?: "dark" | "blue" | "gray";
}

const Button = ({
  type = "button",
  theme = "dark",
  children,
  className,
  ...props
}: Props) => {
  return (
    <button
      className={cn(
        "w-full font-semibold px-7 py-4 rounded-lg text-base transition-all duration-700",
        className,
        {
          "bg-indigo-600": theme === "blue",
          "bg-[#202632] disabled:bg-[#ccd2dd] text-[#f7f9fb]": theme === "dark",
          "bg-[#f1f4f7] text-[#323a49]": theme === "gray",
        }
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
