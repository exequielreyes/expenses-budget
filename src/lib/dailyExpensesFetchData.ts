import { Expense } from "@/types/types"
// import { dailyEx } from "@/mocking/dailyExpensesMock"
import { supabase } from "./supabaseClient"
import { getMonthRange } from "@utils/getMonthRange"

type DailyExpense = {
  date: string
  description: string
  amount: number
  users: { email: string }
  categories: { name: string }
}

export const getDailyExpensesByUserAndDate = async ({ email, date }: { email: string, date: string }) => {

  try {
    const { startOfMonth, startOfNextMonth } = getMonthRange(date)

    const { data, error } = await supabase
      .from('daily_expenses')
      .select(`
        date,
        description,
        categories(name),
        amount,
        users!inner(email)
      `)
      .eq('users.email', email)
      .filter('date', 'gte', startOfMonth)
      .lt('date', startOfNextMonth)


    // const { data, error } = dailyEx

    if (error) {
      console.error('Error al obtener los gastos diarios:', error.message)
      return
    }

    if (!data) {
      console.log('No se encontraron gastos diarios')
      return
    }

    const formattedData: Expense[] = formatData(data as unknown as DailyExpense[])

    return formattedData

  } catch (error) {
    console.log(error)
    return []
  }
}

const formatData = (data: DailyExpense[]): Expense[] => {
  const formattedData = data.map(expense => ({
    date: expense.date,
    description: expense.description,
    category: expense.categories.name,
    amount: expense.amount
  }))

  return formattedData
}