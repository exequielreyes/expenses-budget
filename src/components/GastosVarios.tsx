'use client'

import { useAmount, useGastosVarios } from "@hooks";
import { BentoItemContainer } from "@components";
import { Transaction, Money } from "../types/types";
import NumberFlow from "@number-flow/react";

// TODO: Refactorizar esto

const GastoVarioItem = ({ gasto, className }: { gasto: Transaction, className?: string }) => {
  const { textColor } = useAmount(gasto.amountType as Money)

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <h2 className="font-medium text-xl text-custom-light-gray">{gasto.title}</h2>
      <NumberFlow
        value={gasto.amount}
        format={{ style: 'currency', currency: 'ARS'}}
        className={`text-3xl font-semibold ${textColor}`}
      />
    </div>
  )
}

export const GastosVarios = ({ className }: { className?: string }) => {
  const { gastosVarios } = useGastosVarios()

  return (
    <BentoItemContainer className={className}>
      <div className="flex flex-col gap-7">
        {
          gastosVarios.map((gasto, index) => {
            return <GastoVarioItem key={index} gasto={gasto} />
          })
        }
      </div>
    </BentoItemContainer>
  )
}