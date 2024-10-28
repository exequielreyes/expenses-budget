import { useCallback, useReducer } from "react"
import { gastosVariosReducer, initialGastos } from "@reducers"

export const useGastosVariosReducer = () => {
  const [gastosVarios, dispatch] = useReducer(gastosVariosReducer, initialGastos)

  const updateGasto = (title: string, newContent: number) => {
    dispatch({ type: 'UPDATE_GASTOS_VARIOS', payload: { title, newContent } })
  }

  const updateGastoDiario = useCallback((newContent: number) => updateGasto("Gastos diarios", newContent), [])
  const updateGastoBoludo = useCallback((newContent: number) => updateGasto("Gastos boludos", newContent), [])
  const updateGastoFijo = useCallback((newContent: number) => updateGasto("Gastos fijos", newContent), [])

  return { gastosVarios, updateGastoDiario, updateGastoBoludo, updateGastoFijo }
}