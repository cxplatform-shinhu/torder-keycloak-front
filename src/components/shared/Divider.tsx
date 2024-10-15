import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Divider = ({ children }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <div className="h-[1px] bg-[#ebecf4] flex-1" />
      <span className="text-sm font-normal text-[#778197]">{children}</span>
      <div className="h-[1px] bg-[#ebecf4] flex-1" />
    </div>
  );
};

export default Divider;
