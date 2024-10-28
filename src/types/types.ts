export type Money = "ingreso" | "gasto" | "perdida"

export type Expense = {
  date: string;
  description: string;
  category: string;
  total: number;
}

export type GastoVario = {
  title: string;
  content: number;
  amountType: Money;
}

export type GastosVarios = GastoVario[]