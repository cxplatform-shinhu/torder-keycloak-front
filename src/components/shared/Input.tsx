import { cn } from "@utils/cn";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
}
const Input = ({ className, label, ...props }: Props) => {
  return (
    <div className="flex flex-col">
      {label && <span></span>}
      <input
        className={cn(
          "outline-none border-t-0 border-x-0 border-b-[1px] w-full py-2 transition-all duration-[800ms] focus:border-b-[#6d9ff8]",
          className
        )}
        type="text"
        {...props}
      />
    </div>
  );
};

export default Input;
