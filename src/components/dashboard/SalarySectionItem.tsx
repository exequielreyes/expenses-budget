'use client'

import LargeNumber from "@/components/LargeNumber"
import { EditSalaryDialog } from "@components/EditSalaryDialog"
import { useIngresos } from "@hooks"
import { useEffect } from "react"

export default function SalarySectionItem({ initialSalary, email }: Readonly<{ initialSalary: number, email: string }>) {

  const { updateSueldo, sueldo } = useIngresos()

  useEffect(() => {
    updateSueldo(initialSalary)
  }, [initialSalary])

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