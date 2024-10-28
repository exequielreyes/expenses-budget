import { useCallback, useReducer } from "react"
import { gastosVariosReducer, initialGastos } from "@reducers"

export const useGastosVariosReducer = () => {
  const [gastosVarios, dispatch] = useReducer(gastosVariosReducer, initialGastos)

  const updateGasto = (title: string, newAmount: number) => {
    dispatch({ type: 'UPDATE_GASTOS_VARIOS', payload: { title, newAmount } })
  }

  const updateGastoDiario = useCallback((newAmount: number) => updateGasto("Gastos diarios", newAmount), [])
  const updateGastoBoludo = useCallback((newAmount: number) => updateGasto("Gastos boludos", newAmount), [])
  const updateGastoFijo = useCallback((newAmount: number) => updateGasto("Gastos fijos", newAmount), [])

  return { gastosVarios, updateGastoDiario, updateGastoBoludo, updateGastoFijo }
}