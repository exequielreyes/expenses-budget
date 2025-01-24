import { getMonthRange } from "@utils/getMonthRange"
import { supabase } from "@lib/supabaseClient"

// import { salary } from '@mocking/userMock'
export const getSalaryByUserAndDate = async ({ email, date }: { email: string, date: string }) => {

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

    if (data.length === 0) {
      console.log('No se encontraron ingresos')
      return 0
    }

    return data[0].salary
  } catch (error) {
    console.log(error)
    return 0
  }
}

export const getIdByEmail = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (error) {
      console.log(error)
      return 0
    }

    if (!data) {
      console.log('No se encontraron usuarios')
      return 0
    }

    return data.id
  } catch (error) {
    console.log(error)
    return 0
  }
}

