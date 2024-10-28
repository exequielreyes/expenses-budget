import { useCallback, useReducer } from "react"
import { expensesReducer, initialExpenses } from "@reducers"
import { Expense } from "../types/types"

export const useExpensesReducer = () => {
  const [expenses, dispatch] = useReducer(expensesReducer, initialExpenses)

  const setExpenses = useCallback(
    (expenses: Expense[]) => dispatch({ type: 'SET_EXPENSES', payload: expenses }),
    []
  )

  const addExpense = useCallback(
    (expense: Expense) => dispatch({ type: 'ADD_EXPENSE', payload: expense }),
    []
  )

  const removeExpense = useCallback(
    (index: number) => dispatch({ type: 'REMOVE_EXPENSE', payload: index }),
    []
  )

  return { expenses, setExpenses, addExpense, removeExpense }
}