import { useGlobalContext } from "@context/GlobalContext"
import { encryptData, setDataInLocalStorage } from "@utils"
import { useEffect } from "react"

export const useMiscellaneousExpenses = () => {
  const { miscellaneousExpenses, setMiscellaneousExpenses, addMiscellaneousExpense, removeMiscellaneousExpense, cryptoKey } = useGlobalContext()

  useEffect(() => {
    const syncWithLocalStorage = async () => {
      const { encryptedData, iv } = await encryptData(cryptoKey as CryptoKey, miscellaneousExpenses)
      setDataInLocalStorage('miscellaneousExpenses', { encryptedData, iv })
    }

    if (miscellaneousExpenses && miscellaneousExpenses.length > 0) {
      syncWithLocalStorage()
    }
  }, [miscellaneousExpenses])

  return {
    miscellaneousExpenses,
    setMiscellaneousExpenses,
    addMiscellaneousExpense,
    removeMiscellaneousExpense
  }
}