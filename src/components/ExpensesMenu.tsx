'use client'

import { SelectDropdown } from "@components/SelectDropdown";
import { BentoItemContainer } from "@components/BentoItemContainer";
import { getMonth, getYear } from "@utils/getCurrentDate";
import { useEffect, useState } from "react";
import { getSalaryByUserAndDate } from "@lib/userFetchData";
import { useGlobalContext } from "@context/GlobalContext";
import { getDailyExpensesByUserAndDate } from "@lib/dailyExpensesFetchData";
import { useExpenses, useIngresos } from "@hooks";

const months = [
  { value: "01", label: "Enero" },
  { value: "02", label: "Febrero" },
  { value: "03", label: "Marzo" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Mayo" },
  { value: "06", label: "Junio" },
  { value: "07", label: "Julio" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" }
];

const years = [
  { value: "2025", label: "2025" },
  { value: "2024", label: "2024" },
];

export const ExpensesMenu = () => {
  const { userData, setSelectedDate } = useGlobalContext()
  const { setExpenses } = useExpenses()
  const { updateSueldo } = useIngresos()

  const [selectedMonth, setSelectedMonth] = useState<string>(getMonth())
  const [selectedYear, setSelectedYear] = useState<string>(getYear())

  useEffect(() => {
    const email = userData?.email as string
    const date = `${selectedYear}-${selectedMonth}-01`
    setSelectedDate(date)

    const getSalary = async () => {
      const salary = await getSalaryByUserAndDate({ email, date })
      updateSueldo(salary)
    }

    const getDailyExpenses = async () => {
      const dailyExpenses = await getDailyExpensesByUserAndDate({ email, date })
      console.log('email', email)
      console.log('date', date)
      console.log('dailyExpenses')
      console.log(dailyExpenses)

      if (dailyExpenses) {
        setExpenses(dailyExpenses)
      }
    }

    if (email && selectedMonth && selectedYear) {
      getSalary()
      getDailyExpenses()
    }

  }, [selectedMonth, selectedYear])

  return (
    <BentoItemContainer>
      <div className="py-4">
        <h3 className="font-bold">Seleccionar periodo</h3>
        <h4 className="text-sm text-custom-light-gray">Elegí el periodo del cual deseas ver tus gastos</h4>
      </div>
      <div className="flex gap-4 w-full ">
        <SelectDropdown values={months} selectedValue={selectedMonth} setSelectedValue={setSelectedMonth} />
        <SelectDropdown values={years} selectedValue={selectedYear} setSelectedValue={setSelectedYear} />
      </div>
    </BentoItemContainer>
  );
};