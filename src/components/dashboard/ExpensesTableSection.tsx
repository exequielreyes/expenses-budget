import { TablaGastos } from "@components/TablaGastos";
import { getCategories } from "@lib/categoriesFetchData";
import { getDailyExpensesByUser } from "@lib/dailyExpensesFetchData";
import { Expense } from "@/types/types";

export default async function ExpensesTableSection() {

  const dailyExpenses: Expense[] = await getDailyExpensesByUser({ email: 'leomoreno3330@gmail.com' }) as Expense[]
  const categories = await getCategories()

  return (
    <TablaGastos
      expenses={dailyExpenses}
      categories={categories as { value: string, label: string }[]}
      className="table col-span-8 row-span-12 row-start-1 col-start-1"
    />
  )
}