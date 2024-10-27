"use client"

import { Expense } from '../types/types'
import { getDate } from '@utils'
import { createContext, useContext, ReactNode, useState } from 'react'

interface GlobalContextType {
  expenses: Expense[],
  setExpenses: (expenses: Expense[]) => void,
  cryptoKey: CryptoKey | undefined,
  setCryptoKey: (cryptoKey: CryptoKey | undefined) => void
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

const initialData = [
  { date: getDate(), description: "", category: "", total: 0 },
]

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // const CRYPTO_KEY = "e+Av5ERmVGrWRVwknRGV+7outyvKrsZrFPInslEHviE="
  const [cryptoKey, setCryptoKey] = useState<CryptoKey>()
  const [expenses, setExpenses] = useState<Expense[]>(initialData)

  return (
    <GlobalContext.Provider value={{ expenses, setExpenses, cryptoKey, setCryptoKey }}>
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

