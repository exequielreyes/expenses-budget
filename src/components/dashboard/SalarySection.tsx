import { headers } from "next/headers"
import { getSalaryByUser } from "@lib/userFetchData"
import SalarySectionItem from "@/components/dashboard/SalarySectionItem"

export const SalarySection = async () => {

  const headersList = headers()
  const email: string = headersList.get('x-user-email') as string
  const sueldo = await getSalaryByUser({ email, date: new Date().toISOString().split('T')[0] })

  return (
    <SalarySectionItem sueldo={sueldo} email={email} />
  )
}