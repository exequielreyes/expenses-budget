// import { salary } from '@mocking/userMock'
import { createClient } from "@supabase/supabase-js"

export const getSalaryByUser = async ({ email }: { email: string }) => {

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  try {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0')

    const startOfMonth = `${currentYear}-${currentMonth}-01`
    const startOfNextMonth = new Date(currentYear, currentDate.getMonth() + 1, 1)
      .toISOString()
      .split('T')[0]

    const { data, error } = await supabase
      .from('salaries')
      .select(`
        salary,
        users!inner(email)
      `)
      .eq('users.email', email)
      .gte('month', startOfMonth)
      .lt('month', startOfNextMonth)


    console.log(data)

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