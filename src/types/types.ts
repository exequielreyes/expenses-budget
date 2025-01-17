export type Money = "ingreso" | "gasto" | "perdida"

export type Expense = {
  date: string;
  description: string;
  category: string;
  amount: number;
}

export type OtherExpense = {
  description: string;
  amount: number;
}

export type Transaction = {
  title: string;
  amount: number;
  amountType: Money;
}

export type Transactions = Transaction[]

export type UserData = {
  name: string;
  image: string;
  email: string;
  uid: string;
}