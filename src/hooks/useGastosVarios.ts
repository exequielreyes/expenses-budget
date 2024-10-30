import { useGlobalContext } from "@context/GlobalContext"
import { Expense, OtherExpense } from '../types/types'
import { useCallback, useEffect } from "react"
import { useExpenses, useMiscellaneousExpenses, useStupidExpenses } from "@hooks"

export const useGastosVarios = () => {
  const { gastosVarios, updateGastoDiario, updateGastoFijo, updateGastoBoludo } = useGlobalContext()
  const { expenses } = useExpenses()
  const { miscellaneousExpenses } = useMiscellaneousExpenses()
  const { stupidExpenses } = useStupidExpenses()

  useEffect(() => {
    updateGastoDiario(getTotalExpense(expenses))
  }, [expenses])

  useEffect(() => {
    updateGastoFijo(getTotalExpense(miscellaneousExpenses))
  }, [miscellaneousExpenses])

  useEffect(() => {
    updateGastoBoludo(getTotalExpense(stupidExpenses))
  }, [stupidExpenses])

  const getTotalExpense = useCallback((expense: Expense[] | OtherExpense[]) => expense.reduce((acum, expense) => acum + expense.amount, 0), [])
  const gastoDiario = gastosVarios.find(item => item.title === "Gastos diarios")?.amount || 0

  return {
    gastosVarios,
    updateGastoDiario,
    getTotalExpense,
    gastoDiario,
  }
}
