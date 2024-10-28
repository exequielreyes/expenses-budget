export type Money = "ingreso" | "gasto" | "perdida"

export type Expense = {
  date: string;
  description: string;
  category: string;
  total: number;
}

export type Transaccion = {
  title: string;
  amount: number;
  amountType: Money;
}

export type Transacciones = Transaccion[]