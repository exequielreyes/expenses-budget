'use client'

import { getDate } from "@utils"
import { BentoItemContainer, IconButton, InputItemTable } from "@components"
import { CalendarIcon, CategoryIcon, DescriptionIcon, DolarIcon, PlusIcon, TrashIcon } from "@icons"
import { useExpenses } from "@hooks"
import { Expense } from "../types/types"
import { useState } from "react"

// TODO: Refactorizar esto

export const TablaGastos = ({ className }: { className?: string }) => {

  const { expenses, setExpenses, addExpense, removeExpense } = useExpenses()
  const [isDelete, setIsDelete] = useState<boolean>(false)

  const handleEdit = (index: number, key: keyof typeof expenses[number], value: string) => {
    const newData = [...expenses]

    const parseFloatValue = (value: string) => {
      const parsedValue = parseFloat(value)
      return isNaN(parsedValue) ? 0 : parsedValue
    }

    const newValue = key === 'amount' ? parseFloatValue(value) : value

    newData[index] = { ...newData[index], [key]: newValue }
    setExpenses(newData)
  }

  const handleAddExpense = () => {
    addExpense({ date: getDate(), description: "", category: "", amount: 0 })
  }

  const handleDeleteExpense = (index: number) => {
    removeExpense(index)
    setIsDelete(true)
  }

  return (
    <BentoItemContainer className={className}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="[&>th]:border-b [&>th]:p-4 [&>th]:border-custom-dark-gray text-lg [&>th]:font-normal [&>th]:w-[calc(100%/4)] [&>th>div]:flex [&>th>div]:items-center [&>th>div]:gap-2">
            <th>
              <div>
                <CalendarIcon className="size-5" /> Fecha
              </div>
            </th>
            <th>
              <div>
                <DescriptionIcon className="size-5" /> Descripción
              </div>
            </th>
            <th>
              <div>
                <CategoryIcon className="size-5" /> Categoría
              </div>
            </th>
            <th>
              <div>
                <DolarIcon className="size-5" /> Total
              </div>
            </th>
            <th className="w-12 !border-l-0"></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((item, index) => (
            <tr key={index} className={`group ${index === expenses.length - 1 ? '' : 'border-b'} border-custom-dark-gray`}>
              {Object.entries(item).map(([key, value], colIndex) =>
              (
                <td key={`${index}-${colIndex}`} className={`border-custom-dark-gray text-custom-light-gray text-base`}>
                  <InputItemTable index={index} fieldKey={key as keyof Expense} value={value} handleEdit={handleEdit} isDelete={isDelete} setIsDelete={setIsDelete} />
                </td>
              ))}
              <td className="border-custom-dark-gray text-center">
                <IconButton
                  className="inline-block text-transparent group-hover:text-custom-light-gray transition-all ease-out duration-700 group-hover:duration-200"
                  onClick={() => handleDeleteExpense(index)}>
                  <TrashIcon className="size-6" />
                </IconButton>
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

