import { Expense } from "../types/types";

type Action =
  { type: 'SET_EXPENSES'; payload: Expense[] } |
  { type: 'ADD_EXPENSE'; payload: Expense } |
  { type: 'REMOVE_EXPENSE'; payload: number }

export const initialExpenses: Expense[] = []

export const expensesReducer = (state: Expense[], action: Action): Expense[] => {
  const { type, payload } = action
  switch (type) {
    case 'SET_EXPENSES': return payload
    case 'ADD_EXPENSE': return [...state, payload]
    case 'REMOVE_EXPENSE': return state.filter((_, i) => i !== payload)
    default:
      return state
  }
}