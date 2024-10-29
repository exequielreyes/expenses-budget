import { useGlobalContext } from "@context/GlobalContext"
import { Expense } from '../types/types'
import { useCallback, useEffect } from "react"
import { useExpenses } from "./useExpenses"

export const useGastosVarios = () => {
  const { gastosVarios, updateGastoDiario } = useGlobalContext()
  const { expenses } = useExpenses()

  useEffect(() => {
    updateGastoDiario(getTotalExpense(expenses))
  }, [expenses])

  const getTotalExpense = useCallback((expense: Expense[]) => expense.reduce((acum, expense) => acum + expense.total, 0), [])

  return {
    gastosVarios,
    updateGastoDiario,
    getTotalExpense
  }
}
