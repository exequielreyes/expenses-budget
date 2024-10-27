'use client'

import { useAmount } from "@hooks/useAmount";
import { BentoItemContainer } from "@components";
import { Money } from "../types/types";

const GASTOS_VARIOS = [
  {
    title: "Gastos fijos",
    content: "12.321,52",
    amountType: "gasto",
  },
  {
    title: "Gastos diarios",
    content: "25.213,12",
    amountType: "gasto",
  },
  {
    title: "Gastos boludos",
    content: "31.123,10",
    amountType: "gasto",
  },

];

// TODO: Refactorizar esto

const GastoVarioItem = ({ gasto, className }: { gasto: typeof GASTOS_VARIOS[0], className?: string }) => {
  const { textColor } = useAmount(gasto.amountType as Money)

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <h2 className="font-medium text-xl text-custom-light-gray">{gasto.title}</h2>
      <p className={`text-3xl font-semibold ${textColor}`}>${gasto.content}</p>
    </div>
  )
}

export const GastosVarios = ({ className }: { className?: string }) => {
  return (
    <BentoItemContainer className={className}>
      <div className="flex flex-col gap-7">
        {GASTOS_VARIOS.map((gasto, index) => (
          <GastoVarioItem key={index} gasto={gasto} />
        ))}
      </div>
    </BentoItemContainer>
  )
}