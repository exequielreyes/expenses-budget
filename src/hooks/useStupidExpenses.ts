import { useGlobalContext } from "@context/GlobalContext"
import { encryptData, setDataInLocalStorage } from "@utils"
import { useEffect } from "react"

export const useStupidExpenses = () => {
  const { stupidExpenses, setStupidExpenses, addStupidExpense, removeStupidExpense, cryptoKey } = useGlobalContext()

  useEffect(() => {
    const syncWithLocalStorage = async () => {
      const { encryptedData, iv } = await encryptData(cryptoKey as CryptoKey, stupidExpenses)
      setDataInLocalStorage('stupidExpenses', { encryptedData, iv })
    }
    if (stupidExpenses && cryptoKey) {
      syncWithLocalStorage()
    }
  }, [stupidExpenses])

  return {
    stupidExpenses,
    setStupidExpenses,
    addStupidExpense,
    removeStupidExpense
  }
}