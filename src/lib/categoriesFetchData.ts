// import { categoriesMock } from '@/mocking/categoriesMock'
import { supabase } from './supabaseClient'

type Category = { value: string, label: string }
type FetchedCategories = { id: number, name: string }[]

export const getCategories = async () => {
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*')

    // const { data: categories, error } = categoriesMock

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