'use client'

import LargeNumber from "@/components/LargeNumber"
import { EditSalaryDialog } from "@components/EditSalaryDialog"
import { useGlobalContext } from "@context/GlobalContext"
import { useEffect } from "react"

export default function SalarySectionItem({ sueldo, email }: Readonly<{ sueldo: number, email: string }>) {

  const { updateSueldo, ingresos } = useGlobalContext()
  
  useEffect(() => {
    updateSueldo(sueldo)
  },[sueldo])

  return (
    <LargeNumber
      title="Sueldo"
      amount={ingresos.find(item => item.title === "sueldo")?.amount as number}
      amountType="ingreso"
      edit
      customDialog={<EditSalaryDialog amount={sueldo} email={email} />}
    />
  )
}