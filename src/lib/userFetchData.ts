// import { salary } from '@mocking/userMock'
import { createClient } from "@supabase/supabase-js"

export const getSalaryByUser = async ({ email }: { email: string }) => {

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  try {
    const { data, error } = await supabase
      .from('users')
      .select('salary')
      .eq('email', email)

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