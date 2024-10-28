import { useGlobalContext } from "@context/GlobalContext"

export const useEncrypt = () => {

  const { cryptoKey, setCryptoKey } = useGlobalContext()

  return {
    cryptoKey,
    setCryptoKey
  }
}