'use client'

import { getDate, parseCurrency, priceFormat } from "@utils"
import { BentoItemContainer, IconButton } from "@components"
import { CalendarIcon, CategoryIcon, DescriptionIcon, DolarIcon, PlusIcon, TrashIcon } from "@icons"
import { useExpenses } from "@hooks"
import { Expense } from "../types/types"
import { ChangeEvent, useState } from "react"


type InputItemProps = {
  index: number,
  fieldKey: keyof Expense,
  value: string | number,
  handleEdit: (index: number, key: keyof Expense, value: string) => void
}

const InputItem = ({ index, fieldKey, value, handleEdit }: InputItemProps) => {
  const [inputValue, setInputValue] = useState<string>(
    fieldKey === "total" ? priceFormat(parseCurrency(value.toString())) : value.toString()
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    setInputValue(rawValue)
    handleEdit(index, fieldKey as keyof Expense, rawValue)
  }

  const handleBlur = () => {
    if (fieldKey === "total") {
      const parsedValue = parseCurrency(inputValue)
      handleEdit(index, fieldKey as keyof Expense, parsedValue.toString())
      setInputValue(priceFormat(parsedValue))
    }
  }

  const handleFocus = () => {
    if (fieldKey === "total") {
      const stringValue = value.toString().replace('.', ',')
      setInputValue(stringValue === "0" ? "" : stringValue)
    }
  }

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => handleChange(e)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="w-full bg-transparent border-none p-4 focus:outline-none focus:bg-custom-dark-gray"
    />
  )
}

export const TablaGastos = ({ className }: { className?: string }) => {

  const { expenses, setExpenses, addExpense, removeExpense } = useExpenses()

  const handleEdit = (index: number, key: keyof typeof expenses[number], value: string) => {
    const newData = [...expenses]

    const parseFloatValue = (value: string) => {
      const parsedValue = parseFloat(value)
      return isNaN(parsedValue) ? 0 : parsedValue
    }

    const newValue = key === 'total' ? parseFloatValue(value) : value

    newData[index] = { ...newData[index], [key]: newValue }
    setExpenses(newData)
  }

  const handleAddExpense = () => {
    addExpense({ date: getDate(), description: "", category: "", total: 0 })
  }

  const handleDeleteExpense = (index: number) => {
    removeExpense(index)
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
            <th className="w-12 !border-l-0"></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((item, index) => (
            <tr key={`${item.date}-${index}`} className={`group ${index === expenses.length - 1 ? '' : 'border-b'} border-custom-dark-gray`}>
              {Object.entries(item).map(([key, value], i) =>
              (
                <td key={key} className={`${i === 0 ? '' : 'border-l'} border-custom-dark-gray text-custom-light-gray text-base`}>
                  <InputItem index={index} fieldKey={key as keyof Expense} value={value} handleEdit={handleEdit} />
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

