'use client'

import LargeNumber from "@/components/LargeNumber"

export default function SalarySectionItem({ sueldo }: { sueldo: number }) {
  return (
    <LargeNumber
      title="Sueldo"
      amount={sueldo}
      setAmount={() => { }}
      amountType="ingreso"
      edit
    />
  )
}