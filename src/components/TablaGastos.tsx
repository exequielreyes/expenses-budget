'use client'

import { useEffect, useState } from "react"
import { BentoItemContainer } from "@components/BentoItemContainer"
import { CalendarIcon } from "@icons/Calendar"
import { DescriptionIcon } from "@icons/Description"
import { DolarIcon } from "@icons/Dolar"
import { CategoryIcon } from "@icons/Category"
import { PlusIcon } from "@icons/Plus"
import { TrashIcon } from "@icons/Trash"
import { useLocalStorage } from "@hooks/useLocalStorage"

// const initialData = [
//   { date: "2022-01-01", description: "pan", category: "Supermercado", total: 100 },
//   { date: "2022-01-02", description: "carne", category: "Carnicería", total: 50 },
//   { date: "2022-01-03", description: "lomito", category: "Comida", total: 150 },
// ]

type Expense = {
  date: string;
  description: string;
  category: string;
  total: number;
}

export const TablaGastos = ({ className }: { className?: string }) => {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>({ key: 'expenses', initialValue: [] })
  const [isMounted, setIsMounted] = useState(false) // Control del montaje

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses') || '[]')
    setExpenses(storedExpenses)
    setIsMounted(true)
  }, [setExpenses])

  if (!isMounted) return null

  const handleEdit = (index: number, key: keyof typeof expenses[number], value: string) => {
    const newData = [...expenses]
    newData[index] = { ...newData[index], [key]: key === 'total' ? parseFloat(value) : value }
    setExpenses(newData)
  }

  const handleAddExpense = () => {
    setExpenses([...expenses, { date: new Date().toLocaleDateString('en-CA').split('T')[0], description: "", category: "", total: 0 }])
  }
  
  //funcionalidad DELETE
  const handleDeleteExpense = (index: number) => {
    const newData = expenses.filter((_,i) => i !== index)
    setExpenses(newData)
  }

  return (
    <BentoItemContainer className={className}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="[&>th]:border-l first:[&>th]:border-l-0 [&>th]:border-b [&>th]:p-4 [&>th]:border-custom-dark-gray text-xl [&>th]:font-normal [&>th]:w-[calc(100%/4)] [&>th>div]:flex [&>th>div]:items-center [&>th>div]:gap-2">
            <th>
              <div>
                <CalendarIcon /> Fecha
              </div>
            </th>
            <th>
              <div>
                <DescriptionIcon /> Descripción
              </div>
            </th>
            <th>
              <div>
                <CategoryIcon /> Categoría
              </div>
            </th>
            <th>
              <div>
                <DolarIcon /> Total
              </div>
            </th>
            <th className="w-12"></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((item, index) => (
            <tr key={`${item.date}-${index}`} className={`group ${index === expenses.length - 1 ? '' : 'border-b'} border-custom-dark-gray`}>
              {Object.entries(item).map(([key, value], i) => (
                <td key={key} className={`${i === 0 ? '' : 'border-l'} border-custom-dark-gray text-custom-light-gray text-base`}>
                  <input
                    type={key === "total" ? "number" : "text"}
                    value={value}
                    onChange={(e) => handleEdit(index, key as keyof typeof item, e.target.value)}
                    className="w-full bg-transparent border-none p-4 focus:outline-none focus:bg-custom-dark-gray"
                  />
                </td>
              ))}
              {/* DELETE */}
              <td className="border-l border-custom-dark-gray text-center">
                  <button
                  onClick={() => handleDeleteExpense(index)}
                  className="hidden group-hover:inline-block text-custom-light-gray p-2"
                  >
                    <TrashIcon />
                  </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="w-full p-1 hover:p-4 transition-all flex items-center justify-center gap-1 rounded-b-2xl border border-custom-dark-gray"
        onClick={handleAddExpense}
      >
        <PlusIcon />
      </button>
    </BentoItemContainer>
  )
}

