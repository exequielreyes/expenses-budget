'use client'

import { BentoItemContainer, GastosVarios, LargeNumber, Restante, TablaGastos } from "@components";
import { useEncrypt, useExpenses, useGastosVarios } from "@hooks";
import { useGastoTotal } from "@hooks/useGastoTotal";
import { useIngresos } from "@hooks/useIngresos";
import { decryptData, generateKey, getCryptoKeyFromDB, getDataFromLocalStorage, saveCryptoKeyToDB } from "@utils";
import { useEffect } from "react";

export default function Home() {

  const { setExpenses } = useExpenses()
  const { updateGastoDiario, getTotalExpense } = useGastosVarios()
  const { sueldo, updateSueldo } = useIngresos()
  const { gastoTotal } = useGastoTotal()
  const { setCryptoKey } = useEncrypt()

  useEffect(() => {

    const initializeCryptoKey = async () => {
      let cryptoKey = await getCryptoKeyFromDB()
    
      if (!cryptoKey) {
        cryptoKey = await generateKey()
        await saveCryptoKeyToDB(cryptoKey)
      } else {
      }
    
      return cryptoKey as CryptoKey
    }

    const getExpenses = async () => {
      const cryptoKey = await initializeCryptoKey()
      await setCryptoKey(cryptoKey)
      const encryptedExpenses = await getDataFromLocalStorage<{ encryptedData: string, iv: string }>('expenses')
      const encrtptedIngresos = await getDataFromLocalStorage<{ encryptedData: string, iv: string }>('ingresos')
     
      if(encryptedExpenses) {
        const { encryptedData, iv } = encryptedExpenses
        const decryptedExpenses = await decryptData(cryptoKey as CryptoKey, encryptedData, iv)
        setExpenses(decryptedExpenses)
        updateGastoDiario(getTotalExpense(decryptedExpenses))
      }

      if(encrtptedIngresos) {
        const { encryptedData, iv } = encrtptedIngresos
        const decryptedIngresos = await decryptData(cryptoKey as CryptoKey, encryptedData, iv)
        updateSueldo(decryptedIngresos[0].amount)
      }
    }

    getExpenses()
  }, [])

  return (
    <main className="m-auto max-w-[1670px] h-[calc(100vh-100px)]">
      <div className="grid grid-cols-19 grid-rows-12 gap-6 p-4 w-full h-full">
        <TablaGastos className="table col-span-8 row-span-12 row-start-1 col-start-1" />
        <LargeNumber
          className="col-start-9 col-span-4 row-span-2 row-start-1"
          title="Sueldo"
          amount={sueldo}
          setAmount={updateSueldo}
          amountType="ingreso"
          edit
        />

        <GastosVarios className="col-start-13 col-span-3 row-span-5 row-start-1" />

        <BentoItemContainer className="col-start-16 col-span-4 row-span-5 row-start-1">
          <h1>Gastos boludos</h1>
        </BentoItemContainer>

        <LargeNumber
          className="col-start-9 row-start-3 col-span-4 row-span-2"
          title="Gasto total"
          amount={gastoTotal}
          amountType="gasto"
        />

        <BentoItemContainer className="col-start-9 row-start-6 col-span-5 row-span-7">
          <Restante />
        </BentoItemContainer>
        <BentoItemContainer className="col-start-14 row-start-6 col-span-6 row-span-7">
          <h1>Gastos fijos</h1>
        </BentoItemContainer>
      </div>

    </main>
  );
}
