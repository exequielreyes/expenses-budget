'use client'

import { useState } from "react"
import { BentoItemContainer } from "@components/BentoItemContainer"
import { CalendarIcon } from "@icons/Calendar"
import { DescriptionIcon } from "@icons/Description"
import { DolarIcon } from "@icons/Dolar"
import { CategoryIcon } from "@icons/Category"

const initialData = [
  { date: "2022-01-01", description: "pan", category: "Supermercado", total: 100 },
  { date: "2022-01-02", description: "carne", category: "Carnicería", total: 50 },
  { date: "2022-01-03", description: "lomito", category: "Comida", total: 150 },
]

export const TablaGastos = ({ className }: { className?: string }) => {
  const [data, setData] = useState(initialData)

  const handleEdit = (index: number, key: keyof typeof initialData[number], value: string) => {
    console.log(index, key, value)
    const newData = [...data]
    newData[index] = { ...newData[index], [key]: key === 'total' ? parseFloat(value) : value }
    console.log(newData)
    setData(newData)
  }

  return (
    <BentoItemContainer className={className}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="[&>th]:border-l [&>th]:p-4 [&>th]:border-custom-gray text-xl [&>th]:font-normal [&>th]:w-[calc(100%/4)] [&>th>div]:flex [&>th>div]:items-center [&>th>div]:gap-2">
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
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.date}>
              {Object.entries(item).map(([key, value]) => (
                <td key={key} className="border border-custom-gray text-custom-light-gray text-base">
                  <input
                    type={key === "total" ? "number" : "text"}
                    value={value}
                    onChange={(e) => handleEdit(index, key as keyof typeof item, e.target.value)}
                    className="w-full bg-transparent border-none p-4"
                  // focus:outline-none
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </BentoItemContainer>
  )
}
