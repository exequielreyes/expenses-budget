import { OtherExpense } from "../types/types"
import { useCallback, useReducer } from "react"
import { initialMiscellaneousExpenses, miscellaneousExpensesReducer } from "@reducers"


export const useMiscellaneousExpensesReducer = () => {
  const [miscellaneousExpenses, dispatch] = useReducer(miscellaneousExpensesReducer, initialMiscellaneousExpenses)

  const setMiscellaneousExpenses = useCallback(
    (miscellaneousExpenses: OtherExpense[]) => dispatch({ type: 'SET_MISCELLANEOUS_EXPENSES', payload: miscellaneousExpenses }),
    []
  )

  const addMiscellaneousExpense = useCallback(
    (miscellaneousExpense: OtherExpense) => dispatch({ type: 'ADD_MISCELLANEOUS_EXPENSE', payload: miscellaneousExpense }),
    []
  )

  const removeMiscellaneousExpense = useCallback(
    (index: number) => dispatch({ type: 'REMOVE_MISCELLANEOUS_EXPENSE', payload: index }),
    []
  )

  return { miscellaneousExpenses, setMiscellaneousExpenses, addMiscellaneousExpense, removeMiscellaneousExpense }
}