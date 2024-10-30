import { Transactions } from "../types/types"

type Action = { type: 'UPDATE_INGRESOS'; payload: { title: string; newAmount: number } }

export const initialIngresos: Transactions = [{ title: 'sueldo', amount: 0, amountType: 'ingreso' }]

export const ingresosReducer = (state: Transactions, action: Action) => {
  const { type, payload } = action
  switch (type) {
    case 'UPDATE_INGRESOS':
      return state.map((item) =>
        item.title === payload.title ? { ...item, amount: payload.newAmount } : item
      )
    default:
      return state
  }
}