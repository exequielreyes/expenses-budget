import { useAmount } from "@hooks"
import { Money, Transaction } from "../types/types"
import NumberFlow from "@number-flow/react"

export default function GastoVarioItem({ gasto, className }: { gasto: Transaction, className?: string }) {
  const { textColor } = useAmount(gasto.amountType as Money)

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <h2 className="font-medium text-xl text-custom-light-gray">{gasto.title}</h2>
      <NumberFlow
        value={gasto.amount}
        format={{ style: 'currency', currency: 'ARS' }}
        className={`text-3xl font-semibold ${textColor}`}
      />
    </div>
  )
}