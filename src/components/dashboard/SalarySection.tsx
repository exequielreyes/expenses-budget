import { headers } from "next/headers"
import { getSalaryByUserAndDate } from "@lib/userFetchData"
import SalarySectionItem from "@/components/dashboard/SalarySectionItem"
import { getDate } from "@utils"

export const SalarySection = async () => {

  const headersList = headers()
  const email: string = headersList.get('x-user-email') as string
  const salary = await getSalaryByUserAndDate({ email, date: getDate() })

  return (
    <SalarySectionItem initialSalary={salary} email={email} />
  )
}