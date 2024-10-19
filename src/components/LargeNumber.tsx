'use client'

import { BentoItemContainer } from "@components/BentoItemContainer";
import { Money } from "../types/types";
import { EditIcon } from "@icons/Edit";
import { CloseEyeIcon } from "@icons/CloseEye";
import { useState } from "react";
import { IconButton } from "./IconButton";
import { OpenEyeIcon } from "@icons/OpenEye";
import { MoneyDisplay } from "./MoneyDisplay";
// TODO: Solucionar la importacion de Money (hacerla con aliases)

type LargeNumber = {
  className?: string;
  title: string;
  content: string;
  amountType: Money;
};

export const LargeNumber = ({ className, title, content, amountType }: Readonly<LargeNumber>) => {

  const [isAmountVisible, setIsAmountVisible] = useState(true);

  return (
    <BentoItemContainer className={className}>
      <div className="flex flex-col gap-4 h-full [&>div]:flex [&>div]:justify-between [&>div]:items-center">
        <div>
          <h2 className="text-3xl font-medium">{title}</h2>
          <EditIcon className="size-6 stroke-custom-gray" />
        </div>
        <div>
          <p className={`text-4xl font-semibold 
          ${amountType === 'ingreso'
              ? 'text-custom-green'
              : amountType === 'gasto'
                ? 'text-custom-yellow'
                : 'text-custom-red'
            }`}>
            <MoneyDisplay amount={content} hide={!isAmountVisible} />
          </p>
          <IconButton onClick={() => setIsAmountVisible(!isAmountVisible)}>
            {isAmountVisible ? <OpenEyeIcon className="size-6 stroke-custom-gray" /> : <CloseEyeIcon className="size-6 stroke-custom-gray" />}
          </IconButton>
        </div>
      </div>
    </BentoItemContainer >
  );
};