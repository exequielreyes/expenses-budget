'use client'

import { SelectDropdown } from "@components/SelectDropdown";
import { BentoItemContainer } from "@components/BentoItemContainer";
import { getMonth, getYear } from "@utils/getCurrentDate";
import { useEffect, useState } from "react";
import { getSalaryByUser } from "@lib/userFetchData";
import { useGlobalContext } from "@context/GlobalContext";

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

  const [selectedMonth, setSelectedMonth] = useState(getMonth().toString())
  const [selectedYear, setSelectedYear] = useState(getYear().toString())

  const { userData, updateSueldo } = useGlobalContext()

  useEffect(() => {

    const email = userData?.email as string
    console.log(userData)
    const date = `${selectedYear}-${selectedMonth}-01`
    console.log(date)

    const getSalary = async () => {

      const salary = await getSalaryByUser({ email, date })
      console.log(salary)
      updateSueldo(salary)
    }

    if (email && selectedMonth && selectedYear) {
      getSalary()
    }

  }, [selectedMonth, selectedYear, userData])

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