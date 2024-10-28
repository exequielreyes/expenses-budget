import { useGlobalContext } from "@context/GlobalContext"
import {Expense} from '../types/types'

export const useGastosVarios = () => {
  const { gastosVarios, updateGastoDiario } = useGlobalContext()

  const getTotalExpense = (expense: Expense[]) => expense.reduce((acum, expense) => acum + expense.total, 0)

  return {
    gastosVarios,
    updateGastoDiario,
    getTotalExpense
  }
}
