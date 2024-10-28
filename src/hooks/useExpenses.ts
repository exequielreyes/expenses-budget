import { useEffect } from "react"
import { useGlobalContext } from "@context/GlobalContext"
import { encryptData, setDataInLocalStorage } from "@utils"
export const useExpenses = () => {
  const { expenses, setExpenses, addExpense, removeExpense, cryptoKey } = useGlobalContext()

  useEffect(() => {
    const syncWithLocalStorage = async () => {
      const { encryptedData, iv } = await encryptData(cryptoKey as CryptoKey, expenses)
      setDataInLocalStorage('expenses', { encryptedData, iv })
    }

    if (expenses && expenses.length > 0) {
      syncWithLocalStorage()
    }
  }, [expenses])

  return {
    expenses,
    setExpenses,
    addExpense,
    removeExpense
  }
}
