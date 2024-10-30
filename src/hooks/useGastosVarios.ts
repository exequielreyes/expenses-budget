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

  const getTotalExpense = useCallback((expense: Expense[]) => expense.reduce((acum, expense) => acum + expense.amount, 0), [])
  const gastoDiario = gastosVarios.find(item => item.title === "Gastos diarios")?.amount || 0

  return {
    gastosVarios,
    updateGastoDiario,
    getTotalExpense,
    gastoDiario
  }
}
