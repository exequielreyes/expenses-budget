import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const BentoItemContainer = ({ children, className }: Props) => {

  return (
    <div className={`${className} rounded-2xl bg-custom-black/35 h-fit`}>
      <span className="relative inline-flex overflow-hidden rounded-2xl p-[1px] w-full h-full">
        <span
          className="absolute inset-0 w-full h-full bg-[linear-gradient(-10deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,rgba(255,255,255,0.12)_100%)]"
        ></span>
        <div className={`w-full rounded-2xl bg-custom-black/35 backdrop-blur-3xl ${className?.includes("table") ? "" : "p-4"}`}>
          {children}
        </div>
      </span>
    </div>
  );
};