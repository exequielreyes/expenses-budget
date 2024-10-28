import { useGlobalContext } from "@context/GlobalContext"
import { encryptData, setDataInLocalStorage } from "@utils"
import { useEffect } from "react"

export const useIngresos = () => {
  const { ingresos, updateSueldo, cryptoKey } = useGlobalContext()

  useEffect(() => {
    const syncWithLocalStorage = async () => {
      const { encryptedData, iv } = await encryptData(cryptoKey as CryptoKey, ingresos)
      setDataInLocalStorage('ingresos', { encryptedData, iv })
    }

    if (ingresos && ingresos.length > 0 && ingresos[0].amount > 0) {
      syncWithLocalStorage()
    }
  }, [ingresos])

  return {
    sueldo: ingresos[0].amount,
    updateSueldo
  }
}