"use client"

import { useExpensesReducer, useGastosVariosReducer } from '@reducers'
import { Expense, GastosVarios } from '../types/types'
import { createContext, useContext, ReactNode, useState } from 'react'

interface GlobalContextType {
  expenses: Expense[],
  setExpenses: (expenses: Expense[]) => void,
  addExpense: (expense: Expense) => void,
  removeExpense: (index: number) => void,
  cryptoKey: CryptoKey | undefined,
  setCryptoKey: (cryptoKey: CryptoKey | undefined) => void,
  gastosVarios: GastosVarios,
  updateGastoBoludo: (newContent: number) => void,
  updateGastoDiario: (newContent: number) => void,
  updateGastoFijo: (newContent: number) => void
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const { expenses, setExpenses, addExpense, removeExpense } = useExpensesReducer()
  const { gastosVarios, updateGastoBoludo, updateGastoDiario, updateGastoFijo } = useGastosVariosReducer()
  const [cryptoKey, setCryptoKey] = useState<CryptoKey>()

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
      updateGastoFijo
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

