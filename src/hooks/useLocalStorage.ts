'use client'

import { useState } from "react"

type UseLocalStorage<T> = {
  key: string
  initialValue: T
}

export const useLocalStorage = <T>({ key, initialValue }: UseLocalStorage<T>) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue] as const
}
