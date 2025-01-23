import { supabase } from "./supabaseClient"

// import { salary } from '@mocking/userMock'
export const getSalaryByUser = async ({ email, date }: { email: string, date: string }) => {

  try {
    const { startOfMonth, startOfNextMonth } = getMonthRange(date)

    const { data, error } = await supabase
      .from('salaries')
      .select(`
        salary,
        users!inner(email)
      `)
      .eq('users.email', email)
      .gte('month', startOfMonth)
      .lt('month', startOfNextMonth)


    // console.log(data)

    // const { data, error } = salary

    if (error) {
      console.log(error)
      return 0
    }

    if (!data) {
      console.log('No se encontraron categorías')
      return 0
    }

    return data[0].salary
  } catch (error) {
    console.log(error)
    return 0
  }
}

function getMonthRange(date: string) {
  const inputDate = new Date(date)

  const startOfMonth = new Date(inputDate.getUTCFullYear(), inputDate.getUTCMonth(), 1)
  const startOfNextMonth = new Date(inputDate.getUTCFullYear(), inputDate.getUTCMonth() + 1, 1)

  const formatDate = (date: Date) => date.toISOString().split('T')[0]

  return {
    startOfMonth: formatDate(startOfMonth),
    startOfNextMonth: formatDate(startOfNextMonth),
  }
}