import { createClient } from "@supabase/supabase-js"

export const getSalaryByUser = async ({ email }: { email: string }) => {

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  try {
    const { data, error } = await supabase
      .from('users')
      .select('salary')
      .eq('email', email)

    if (error) {
      console.log(error)
      return
    }

    if (!data) {
      console.log('No se encontraron categorías')
      return
    }
    return data[0].salary

  } catch (error) {
    console.log(error)
    return 0
  }
}