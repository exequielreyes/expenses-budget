'use client'

import { BentoItemContainer, GastosVarios, LargeNumber, Restante, TablaGastos, Table } from "@components";
import { ExpensesMenu } from "@components/ExpensesMenu";
import { useEncrypt, useExpenses, useGastosVarios, useGastoTotal, useIngresos, useMiscellaneousExpenses, useStupidExpenses } from "@hooks";
import { decryptData, generateKey, getCryptoKeyFromDB, getDataFromLocalStorage, saveCryptoKeyToDB } from "@utils";
import { useEffect } from "react";

export default function Home() {

  const { setExpenses } = useExpenses()
  const { miscellaneousExpenses, setMiscellaneousExpenses, addMiscellaneousExpense, removeMiscellaneousExpense } = useMiscellaneousExpenses()
  const { stupidExpenses, setStupidExpenses, addStupidExpense, removeStupidExpense } = useStupidExpenses()
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
      const encryptedMiscellaneousExpenses = await getDataFromLocalStorage<{ encryptedData: string, iv: string }>('miscellaneousExpenses')
      const encryptedStupidExpenses = await getDataFromLocalStorage<{ encryptedData: string, iv: string }>('stupidExpenses')

      if (encryptedExpenses) {
        const { encryptedData, iv } = encryptedExpenses
        const decryptedExpenses = await decryptData(cryptoKey as CryptoKey, encryptedData, iv)
        setExpenses(decryptedExpenses)
        updateGastoDiario(getTotalExpense(decryptedExpenses))
      }

      if (encryptedMiscellaneousExpenses) {
        const { encryptedData, iv } = encryptedMiscellaneousExpenses
        const decryptedMiscellaneousExpenses = await decryptData(cryptoKey as CryptoKey, encryptedData, iv)
        setMiscellaneousExpenses(decryptedMiscellaneousExpenses)
      }

      if (encryptedStupidExpenses) {
        const { encryptedData, iv } = encryptedStupidExpenses
        const decryptedStupidExpenses = await decryptData(cryptoKey as CryptoKey, encryptedData, iv)
        setStupidExpenses(decryptedStupidExpenses)
      }

      if (encrtptedIngresos) {
        const { encryptedData, iv } = encrtptedIngresos
        const decryptedIngresos = await decryptData(cryptoKey as CryptoKey, encryptedData, iv)
        updateSueldo(decryptedIngresos[0].amount)
      }
    }

    getExpenses()
  }, [])

  return (
    <main className="m-auto max-w-[1670px]">
      <div className="py-4 w-full h-full flex flex-col gap-4">
        <ExpensesMenu />
        <div className="grid grid-cols-19 grid-rows-12 gap-6">
          <TablaGastos className="table col-span-8 row-span-12 row-start-1 col-start-1" />
          <div className="flex flex-col gap-6 row-start-1 col-start-9 row-span-12 col-span-11">
            <div className="flex gap-6">
              <div className="flex flex-col gap-6">
                <LargeNumber
                  title="Sueldo"
                  amount={sueldo}
                  setAmount={updateSueldo}
                  amountType="ingreso"
                  edit
                />
                <LargeNumber
                  title="Gasto total"
                  amount={gastoTotal}
                  amountType="gasto"
                />
              </div>
              <GastosVarios />
              <Table
                className="table"
                name="Gastos fijos"
                otherExpenses={miscellaneousExpenses}
                setOtherExpenses={setMiscellaneousExpenses}
                addOtherExpense={addMiscellaneousExpense}
                removeOtherExpense={removeMiscellaneousExpense}
              />
            </div>
            <div className="flex gap-6 w-full">
              <BentoItemContainer >
                <Restante />
              </BentoItemContainer>
              <Table
                className="table"
                name="Gastos boludos"
                otherExpenses={stupidExpenses}
                setOtherExpenses={setStupidExpenses}
                addOtherExpense={addStupidExpense}
                removeOtherExpense={removeStupidExpense}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
