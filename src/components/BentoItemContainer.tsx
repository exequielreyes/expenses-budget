import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const BentoItemContainer = ({ children, className }: Props) => {
  return (
    <div className={`${className} rounded-2xl p-4 bg-custom-black`}>
      {children}
    </div>
  );
};