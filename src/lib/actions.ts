'use server'

import { z } from "zod"
// import { revalidatePath } from "next/cache"
import { getMonthRange } from "@utils/getMonthRange"
import { supabase } from "./supabaseClient"
import { getIdByEmail } from "./userFetchData"

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const UpdateSalarySchema = z.object({
  salary: z.number().min(0),
  email: z.string().email(),
  date: z.string().refine((val) => dateRegex.test(val), {
    message: 'La fecha debe estar en el formato YYYY-MM-DD',
  }),
});

export async function updateSalary({ email, salary, date }: { email: string, salary: number, date: string }) {
  try {
    UpdateSalarySchema.parse({ email, salary, date })
    const { startOfMonth, startOfNextMonth } = getMonthRange(date)

    const userId = await getIdByEmail(email)

    const { data, error } = await supabase
      .from('salaries')
      .update({ salary })
      .eq('user_id', userId)
      .gte('month', startOfMonth)
      .lt('month', startOfNextMonth)
      .select()

    if (error) {
      console.log(error)
      return { error: true, message: error.message }
    }

    if (!data) {
      console.log('No se encontraron usuarios')
      return { error: true, message: 'No se encontraron usuarios' }
    }

    // revalidatePath('/dashboard')
    return { success: true, salary: data[0].salary }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log('Errores de validación:', error.errors)
      return { error: true, message: 'Datos de entrada inválidos', details: error.errors }
    }
    console.log('Error inesperado:', error)
    return { error: true, message: 'Error inesperado' }
  }
}
