import { createClient } from "@supabase/supabase-js"

type Category = { value: string, label: string }
type FetchedCategories = { id: number, name: string }[]

export const getCategories = async () => {

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')

    if (error) {
      console.log(error)
      return
    }

    if (!categories) {
      console.log('No se encontraron categorías')
      return
    }

    const parsedCategories = parseCategories(categories || [])
    return parsedCategories
  } catch (error) {
    console.log(error)
    return []
  }
}

const parseCategories = (categories: FetchedCategories): Category[] => {
  return categories.map(({ name }) => ({ value: name, label: name }))
}