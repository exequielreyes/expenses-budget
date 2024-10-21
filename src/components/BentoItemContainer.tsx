import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const BentoItemContainer = ({ children, className }: Props) => {
  return (
    <div className={`${className} rounded-2xl bg-custom-black`}>
      <span className="relative inline-flex overflow-hidden rounded-2xl p-[1px] w-full h-full">
        <span
          className="absolute inset-0 w-full h-full bg-[linear-gradient(-10deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,rgba(255,255,255,0.1)_100%)]"
        ></span>
        <div className="w-full rounded-2xl p-4 bg-custom-black backdrop-blur-3xl">
          {children}
        </div>
      </span>
    </div>
  );
};