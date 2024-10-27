export type Money = "ingreso" | "gasto" | "perdida"

export type Expense = {
  date: string;
  description: string;
  category: string;
  total: number;
}