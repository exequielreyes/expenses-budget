import { TablaGastos } from "@components/TablaGastos";
import { getCategories } from "@lib/categoriesFetchData";
import { getDailyExpensesByUserAndDate } from "@lib/dailyExpensesFetchData";
import { Expense } from "@/types/types";
import { headers } from "next/headers";
import { getDate } from "@utils";

export default async function ExpensesTableSection() {

  const headersList = headers()
  const email: string = headersList.get('x-user-email') as string
  const dailyExpenses: Expense[] = await getDailyExpensesByUserAndDate({ email, date: getDate() }) as Expense[]
  const categories = await getCategories()

  return (
    <TablaGastos
      initialExpenses={dailyExpenses}
      categories={categories as { value: string, label: string }[]}
      className="table col-span-8 row-span-12 row-start-1 col-start-1"
    />
  )
}