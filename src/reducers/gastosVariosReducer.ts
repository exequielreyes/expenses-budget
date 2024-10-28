import { GastosVarios } from "../types/types";

type Action = { type: 'UPDATE_GASTOS_VARIOS'; payload: { title: string; newContent: number } }

export const initialGastos: GastosVarios = [
  { title: "Gastos fijos", content: 0, amountType: "gasto" },
  { title: "Gastos diarios", content: 0, amountType: "gasto" },
  { title: "Gastos boludos", content: 0, amountType: "gasto" }
]

export const gastosVariosReducer = (state: GastosVarios, action: Action): GastosVarios => {
  const { type, payload } = action
  switch (type) {
    case 'UPDATE_GASTOS_VARIOS':
      return state.map((item) =>
        item.title === payload.title ? { ...item, content: payload.newContent } : item
      )
    default:
      return state
  }
}