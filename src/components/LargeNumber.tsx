'use client'

import { Money } from "@/types/types";
import { MoneyDisplay, BentoItemContainer } from "@components";

type LargeNumberBase = {
  className?: string
  title: string
  amount: number
  amountType: Money
}

type LargeNumberWithEdit = LargeNumberBase & {
  edit: true
  customDialog: JSX.Element // Obligatorio cuando edit es true
}

type LargeNumberWithoutEdit = LargeNumberBase & {
  edit?: false
  customDialog?: never // No permitido cuando edit es false
}

type LargeNumberProps = LargeNumberWithEdit | LargeNumberWithoutEdit

export default function LargeNumber({
  className,
  title,
  amount,
  amountType,
  edit,
  customDialog
}: Readonly<LargeNumberProps>) {
  return (
    <BentoItemContainer className={className}>
      <div className={`flex flex-col h-full w-full [&>div]:flex [&>div]:justify-between [&>div]:items-center gap-2`}>
        <div>
          <h2 className="text-3xl font-medium">{title}</h2>
          {edit && customDialog}
        </div>
        <div>
          <MoneyDisplay amount={amount} amountType={amountType} edit={edit} />
        </div>
      </div>
    </BentoItemContainer>
  )
}