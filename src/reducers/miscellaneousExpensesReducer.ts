import { OtherExpense } from "../types/types"

type Action =
  { type: 'SET_MISCELLANEOUS_EXPENSES'; payload: OtherExpense[] } |
  { type: 'ADD_MISCELLANEOUS_EXPENSE'; payload: OtherExpense } |
  { type: 'REMOVE_MISCELLANEOUS_EXPENSE'; payload: number }

export const initialMiscellaneousExpenses: OtherExpense[] = []

export const miscellaneousExpensesReducer = (state: OtherExpense[], action: Action): OtherExpense[] => {
  const { type, payload } = action
  switch (type) {
    case 'SET_MISCELLANEOUS_EXPENSES': return payload
    case 'ADD_MISCELLANEOUS_EXPENSE': return [...state, payload]
    case 'REMOVE_MISCELLANEOUS_EXPENSE': return state.filter((_, i) => i !== payload)
    default:
      return state
  }
}