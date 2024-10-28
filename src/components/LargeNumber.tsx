'use client'

import { EditIcon } from "@/icons";
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
      <div className={`flex flex-col h-full [&>div]:flex [&>div]:justify-between [&>div]:items-center ${ edit ? 'gap-3' : 'gap-2'}`}>
        <div>
          <h2 className="text-3xl font-medium">{title}</h2>
          { edit && <EditIcon className="size-6 stroke-custom-gray" /> }
        </div>
        <div>
          <MoneyDisplay amount={amount} setAmount={setAmount} amountType={amountType} edit={edit} />
        </div>
      </div>
    </BentoItemContainer >
  );
};