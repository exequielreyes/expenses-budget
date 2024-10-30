
import { OtherExpense } from "../types/types"
import { useCallback, useReducer } from "react"
import { initialStupidExpenses, stupidExpensesReducer } from "@reducers"


export const useStupidExpensesReducer = () => {
  const [stupidExpenses, dispatch] = useReducer(stupidExpensesReducer, initialStupidExpenses)

  const setStupidExpenses = useCallback(
    (stupidExpenses: OtherExpense[]) => dispatch({ type: 'SET_STUPID_EXPENSES', payload: stupidExpenses }),
    []
  )

  const addStupidExpense = useCallback(
    (stupidExpense: OtherExpense) => dispatch({ type: 'ADD_STUPID_EXPENSE', payload: stupidExpense }),
    []
  )

  const removeStupidExpense = useCallback(
    (index: number) => dispatch({ type: 'REMOVE_STUPID_EXPENSE', payload: index }),
    []
  )

  return { stupidExpenses, setStupidExpenses, addStupidExpense, removeStupidExpense }
}