import { useGlobalContext } from "@context/GlobalContext"
import { useCallback, useEffect } from "react"
import { useGastosVarios } from "./useGastosVarios"
import { Transactions } from "../types/types"

export const useGastoTotal = () => {
  const { gastoTotal, setGastoTotal } = useGlobalContext()
  const { gastosVarios } = useGastosVarios()

  useEffect(() => {
    const total = getGastoTotal(gastosVarios)
    setGastoTotal(total)
  }, [gastosVarios])

  const getGastoTotal = useCallback((gastosVarios: Transactions) => (gastosVarios.reduce((acum, gasto) => acum + gasto.amount, 0)), [])

  return { gastoTotal, setGastoTotal }
}