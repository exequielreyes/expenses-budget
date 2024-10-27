'use client'

import { getDate } from "@utils"
import { BentoItemContainer } from "@components"
import { CalendarIcon, CategoryIcon, DescriptionIcon, DolarIcon, PlusIcon, TrashIcon } from "@icons"
import { useExpenses } from "@hooks"

export const TablaGastos = ({ className }: { className?: string }) => {
  
  const { expenses, updateExpenses } = useExpenses()

  const handleEdit = (index: number, key: keyof typeof expenses[number], value: string) => {
    const newData = [...expenses]
    newData[index] = { ...newData[index], [key]: key === 'total' ? parseFloat(value) : value }
    updateExpenses(newData)
  }

  const handleAddExpense = () => {
    updateExpenses([...expenses, { date: getDate(), description: "", category: "", total: 0 }])
  }
  
  //funcionalidad DELETE
  const handleDeleteExpense = (index: number) => {
    const newData = expenses.filter((_,i) => i !== index)
    updateExpenses(newData)
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

