import { createClient } from "@supabase/supabase-js"
import { Expense } from "@/types/types"

type DailyExpense = {
  date: string
  description: string
  amount: number
  users: { email: string }
  categories: { name: string }
}

export const getDailyExpensesByUser = async ({ email }: { email: string }) => {

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  try {
    const { data, error } = await supabase
      .from('daily_expenses')
      .select(`
        date,
        description,
        categories(name),
        amount,
        users(email)
      `)
      .eq('users.email', email)

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