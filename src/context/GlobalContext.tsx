"use client"

import { useExpensesReducer, useGastosVariosReducer, useIngresosReducer, useMiscellaneousExpensesReducer, useStupidExpensesReducer } from '@reducers'
import { Expense, OtherExpense, Transactions } from '../types/types'
import { createContext, useContext, ReactNode, useState } from 'react'

interface GlobalContextType {
  cryptoKey: CryptoKey | undefined,
  expenses: Expense[],
  setExpenses: (expenses: Expense[]) => void,
  addExpense: (expense: Expense) => void,
  removeExpense: (index: number) => void,
  setCryptoKey: (cryptoKey: CryptoKey | undefined) => void,
  gastosVarios: Transactions,
  updateGastoBoludo: (newContent: number) => void,
  updateGastoDiario: (newContent: number) => void,
  updateGastoFijo: (newContent: number) => void,
  ingresos: Transactions,
  updateSueldo:  (newAmount: number) => void,
  gastoTotal: number,
  setGastoTotal: (newAmount: number) => void,
  miscellaneousExpenses: OtherExpense[],
  setMiscellaneousExpenses: (miscellaneousExpenses: OtherExpense[]) => void,
  addMiscellaneousExpense: (miscellaneousExpense: OtherExpense) => void,
  removeMiscellaneousExpense: (index: number) => void,
  stupidExpenses: OtherExpense[],
  setStupidExpenses: (stupidExpenses: OtherExpense[]) => void,
  addStupidExpense: (stupidExpense: OtherExpense) => void,
  removeStupidExpense: (index: number) => void,
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [cryptoKey, setCryptoKey] = useState<CryptoKey>()
  const [gastoTotal, setGastoTotal] = useState<number>(0)
  
  const { expenses, setExpenses, addExpense, removeExpense } = useExpensesReducer()
  const { miscellaneousExpenses, setMiscellaneousExpenses, addMiscellaneousExpense, removeMiscellaneousExpense } = useMiscellaneousExpensesReducer()
  const { stupidExpenses, setStupidExpenses, addStupidExpense, removeStupidExpense } = useStupidExpensesReducer()
  const { gastosVarios, updateGastoBoludo, updateGastoDiario, updateGastoFijo } = useGastosVariosReducer()
  const { ingresos, updateSueldo } = useIngresosReducer()

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
      miscellaneousExpenses,
      setMiscellaneousExpenses,
      addMiscellaneousExpense,
      removeMiscellaneousExpense,
      stupidExpenses,
      setStupidExpenses,
      addStupidExpense,
      removeStupidExpense
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

