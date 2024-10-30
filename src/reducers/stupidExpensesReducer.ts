import { OtherExpense } from "../types/types";

type Action =
  { type: 'SET_STUPID_EXPENSES'; payload: OtherExpense[] } |
  { type: 'ADD_STUPID_EXPENSE'; payload: OtherExpense } |
  { type: 'REMOVE_STUPID_EXPENSE'; payload: number }

export const initialStupidExpenses: OtherExpense[] = []

export const stupidExpensesReducer = (state: OtherExpense[], action: Action): OtherExpense[] => {
  const { type, payload } = action
  switch (type) {
    case 'SET_STUPID_EXPENSES': return payload
    case 'ADD_STUPID_EXPENSE': return [...state, payload]
    case 'REMOVE_STUPID_EXPENSE': return state.filter((_, i) => i !== payload)
    default:
      return state
  }
}