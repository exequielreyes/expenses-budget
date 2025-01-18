'use client'

import { useGastosVarios } from "@hooks";
import { BentoItemContainer } from "@components";
import GastoVarioItem from "@components/GastosVariosItem";

// TODO: Refactorizar esto



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