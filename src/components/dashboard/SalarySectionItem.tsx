'use client'

import LargeNumber from "@/components/LargeNumber"
import { EditSalaryDialog } from "@components/EditSalaryDialog"

export default function SalarySectionItem({ sueldo, email }: Readonly<{ sueldo: number, email: string }>) {
  return (
    <LargeNumber
      title="Sueldo"
      amount={sueldo}
      amountType="ingreso"
      edit
      customDialog={<EditSalaryDialog amount={sueldo} email={email} />}
    />
  )
}