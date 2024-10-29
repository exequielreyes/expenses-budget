import { Transacciones } from "../types/types";

type Action = { type: 'UPDATE_GASTOS_VARIOS'; payload: { title: string; newAmount: number } }

export const initialGastos: Transacciones = [
  { title: "Gastos fijos", amount: 0, amountType: "gasto" },
  { title: "Gastos diarios", amount: 0, amountType: "gasto" },
  { title: "Gastos boludos", amount: 300000.12, amountType: "gasto" }
]

export const gastosVariosReducer = (state: Transacciones, action: Action): Transacciones => {
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