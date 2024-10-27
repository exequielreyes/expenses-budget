import { useGlobalContext } from "@context/GlobalContext"
import { Expense } from "../types/types"
import { encryptData, setDataInLocalStorage } from "@utils"

export const useExpenses = () => {

  const { expenses, setExpenses, cryptoKey } = useGlobalContext()

  const updateExpenses = async (expenses: Expense[]) => {
    setExpenses(expenses)
    
    const { encryptedData, iv } = await encryptData(cryptoKey as CryptoKey, expenses)
    setDataInLocalStorage('expenses', { encryptedData, iv })
  }

  return {
    expenses,
    updateExpenses
  }
}