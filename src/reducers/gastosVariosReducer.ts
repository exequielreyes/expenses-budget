import { Transactions } from "../types/types";

type Action = { type: 'UPDATE_GASTOS_VARIOS'; payload: { title: string; newAmount: number } }

export const initialGastos: Transactions = [
  { title: "Gastos diarios", amount: 0, amountType: "gasto" },
  { title: "Gastos fijos", amount: 0, amountType: "gasto" },
  { title: "Gastos boludos", amount: 0, amountType: "gasto" }
]

export const gastosVariosReducer = (state: Transactions, action: Action): Transactions => {
  const { type, payload } = action
  switch (type) {
    case 'UPDATE_GASTOS_VARIOS':
      return state.map((item) =>
        item.title === payload.title ? { ...item, amount: payload.newAmount } : item
      )
    default:
      return state
  }
}