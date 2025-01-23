'use server'

import { z } from "zod"
import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

const UpdateSalarySchema = z.object({
  salary: z.number().min(0),
  email: z.string().email()
})

export async function updateSalary(email: string, salary: number) {
  try {
    UpdateSalarySchema.parse({ email, salary })

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase
      .from('users')
      .update({ salary })
      .eq('email', email)
      .select()

    if (error) {
      console.log(error)
      return { error: true, message: error.message }
    }

    if (!data) {
      console.log('No se encontraron usuarios')
      return { error: true, message: 'No se encontraron usuarios' }
    }

    revalidatePath('/dashboard')
    return { success: true, data }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log('Errores de validación:', error.errors)
      return { error: true, message: 'Datos de entrada inválidos', details: error.errors }
    }
    console.log('Error inesperado:', error)
    return { error: true, message: 'Error inesperado' }
  }
}
