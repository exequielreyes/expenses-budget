import { useGlobalContext } from "@context/GlobalContext"
import { Expense, OtherExpense } from '../types/types'
import { useCallback, useEffect } from "react"
import { useExpenses } from "./useExpenses"
import { useMiscellaneousExpenses } from "./useMiscellaneousExpenses"

export const useGastosVarios = () => {
  const { gastosVarios, updateGastoDiario, updateGastoFijo } = useGlobalContext()
  const { expenses } = useExpenses()
  const { miscellaneousExpenses } = useMiscellaneousExpenses()

  useEffect(() => {
    updateGastoDiario(getTotalExpense(expenses))
  }, [expenses])

  useEffect(() => {
    updateGastoFijo(getTotalExpense(miscellaneousExpenses))
  }, [miscellaneousExpenses])

  const getTotalExpense = useCallback((expense: Expense[] | OtherExpense[]) => expense.reduce((acum, expense) => acum + expense.amount, 0), [])
  const gastoDiario = gastosVarios.find(item => item.title === "Gastos diarios")?.amount || 0

  return {
    gastosVarios,
    updateGastoDiario,
    getTotalExpense,
    gastoDiario,
  }
}
