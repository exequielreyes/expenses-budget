"use client"

import { useExpensesReducer, useGastosVariosReducer, useIngresosReducer } from '@reducers'
import { Expense, Transactions } from '../types/types'
import { createContext, useContext, ReactNode, useState } from 'react'

interface GlobalContextType {
  expenses: Expense[],
  setExpenses: (expenses: Expense[]) => void,
  addExpense: (expense: Expense) => void,
  removeExpense: (index: number) => void,
  cryptoKey: CryptoKey | undefined,
  setCryptoKey: (cryptoKey: CryptoKey | undefined) => void,
  gastosVarios: Transactions,
  updateGastoBoludo: (newContent: number) => void,
  updateGastoDiario: (newContent: number) => void,
  updateGastoFijo: (newContent: number) => void,
  ingresos: Transactions,
  updateSueldo:  (newAmount: number) => void,
  gastoTotal: number,
  setGastoTotal: (newAmount: number) => void,
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const { expenses, setExpenses, addExpense, removeExpense } = useExpensesReducer()
  const { gastosVarios, updateGastoBoludo, updateGastoDiario, updateGastoFijo } = useGastosVariosReducer()
  const { ingresos, updateSueldo } = useIngresosReducer()
  const [cryptoKey, setCryptoKey] = useState<CryptoKey>()
  const [gastoTotal, setGastoTotal] = useState<number>(0)

  return (
    <GlobalContext.Provider value={{
      expenses,
      setExpenses,
      addExpense,
      removeExpense,
      cryptoKey,
      setCryptoKey,
      gastosVarios,
      updateGastoBoludo,
      updateGastoDiario,
      updateGastoFijo,
      ingresos,
      updateSueldo,
      gastoTotal,
      setGastoTotal,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext)

  if (!context) {
    throw new Error('useGlobalContext debe ser usado dentro de GlobalProvider')
  }

  return context
}

