'use client'

import { BentoItemContainer } from "@components/BentoItemContainer";
import { EditIcon } from "@/icons/Edit";
import { Money } from "@/types/types";
import { MoneyDisplay } from "./MoneyDisplay";

type LargeNumber = {
  className?: string;
  title: string;
  content: string;
  amountType: Money;
};

export const LargeNumber = ({ className, title, content, amountType }: Readonly<LargeNumber>) => {

  return (
    <BentoItemContainer className={className}>
      <div className="flex flex-col gap-4 h-full [&>div]:flex [&>div]:justify-between [&>div]:items-center">
        <div>
          <h2 className="text-3xl font-medium">{title}</h2>
          <EditIcon className="size-6 stroke-custom-gray" />
        </div>
        <div>
          <MoneyDisplay amount={content} amountType={amountType} />
        </div>
      </div>
    </BentoItemContainer >
  );
};