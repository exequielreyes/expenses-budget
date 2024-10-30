'use client'

import { DescriptionIcon, DolarIcon, PlusIcon, TrashIcon } from "@icons"
import { IconButton, InputItemTable, BentoItemContainer } from "@components"
import { useState } from "react"
import { OtherExpense } from "../types/types"

type TableProps = {
  className?: string
  name: string
  otherExpenses: OtherExpense[]
  setOtherExpenses: (otherExpenses: OtherExpense[]) => void
  addOtherExpense: (otherExpense: OtherExpense) => void
  removeOtherExpense: (index: number) => void
}

export const Table = ({ name, className, otherExpenses, setOtherExpenses, addOtherExpense, removeOtherExpense }: Readonly<TableProps>) => {

  
  const [isDelete, setIsDelete] = useState<boolean>(false)

  const handleEdit = (index: number, key: keyof typeof otherExpenses[number], value: string) => {
    const newData = [...otherExpenses]

    const parseFloatValue = (value: string) => {
      const parsedValue = parseFloat(value)
      return isNaN(parsedValue) ? 0 : parsedValue
    }

    const newValue = key === 'amount' ? parseFloatValue(value) : value

    newData[index] = { ...newData[index], [key]: newValue }
    setOtherExpenses(newData)
  }

  const handleAddExpense = () => {
    addOtherExpense({ description: "", amount: 0 })
  }

  const handleDeleteExpense = (index: number) => {
    removeOtherExpense(index)
    setIsDelete(true)
  }

  return (
    <BentoItemContainer className={className}>
      <h2 className="text-center text-xl font-medium py-4">{name}</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="[&>th]:border-y [&>th]:p-4 [&>th]:border-custom-dark-gray text-lg [&>th]:font-normal [&>th]:w-[calc(100%/2)] [&>th>div]:flex [&>th>div]:items-center [&>th>div]:gap-2">
            <th>
              <div>
                <DescriptionIcon className="size-5" /> Descripción
              </div>
            </th>
            <th>
              <div>
                <DolarIcon className="size-5" /> Total
              </div>
            </th>
            <th className="!border-l-0"></th>
          </tr>
        </thead>
        <tbody>
          {otherExpenses.map((item, index) => (
            <tr key={index} className={`group ${index === otherExpenses.length - 1 ? '' : 'border-b'} border-custom-dark-gray`}>
              {Object.entries(item).map(([key, value], colIndex) =>
              (
                <td key={`${index}-${colIndex}`} className={`border-custom-dark-gray text-custom-light-gray text-base`}>
                  <InputItemTable index={index} fieldKey={key as keyof OtherExpense} value={value} handleEdit={handleEdit} isDelete={isDelete} setIsDelete={setIsDelete} />
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