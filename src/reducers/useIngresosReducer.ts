import { useCallback, useReducer } from "react"
import { ingresosReducer, initialIngresos } from "@reducers"

export const useIngresosReducer = () => {
  const [ingresos, dispatch] = useReducer(ingresosReducer, initialIngresos)

  const updateIngresos = (title: string, newAmount: number) => {
    dispatch({ type: 'UPDATE_INGRESOS', payload: { title, newAmount } })
  }

  const updateSueldo = useCallback((newAmount: number) => updateIngresos("sueldo", newAmount), [])

  return { ingresos, updateSueldo }
}