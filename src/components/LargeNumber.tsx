'use client'

import { Money } from "@/types/types";
import { MoneyDisplay, BentoItemContainer } from "@components";

type LargeNumber = {
  className?: string;
  title: string;
  amount: number;
  amountType: Money;
  setAmount?: (amount: number) => void;
  edit?: boolean;
};

export const LargeNumber = ({ className, title, amount, setAmount, amountType, edit = false }: Readonly<LargeNumber>) => {

  return (
    <BentoItemContainer className={className}>
      <div className={`flex flex-col h-full w-full [&>div]:flex [&>div]:justify-between [&>div]:items-center gap-2`}>
        <div>
          <h2 className="text-3xl font-medium">{title}</h2>
        </div>
        <div>
          <MoneyDisplay amount={amount} setAmount={setAmount} amountType={amountType} edit={edit} />
        </div>
      </div>
    </BentoItemContainer >
  );
};