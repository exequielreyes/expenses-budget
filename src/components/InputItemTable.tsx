'use client';

import { ChangeEvent, useEffect, useState } from "react";
import { Expense, OtherExpense } from "../types/types";
import { parseCurrency, priceFormat } from "@utils";

type InputItemProps<T> = {
  index: number,
  fieldKey: keyof T,
  value: string | number,
  handleEdit: (index: number, key: keyof T, value: string) => void
  isDelete: boolean,
  setIsDelete: (isDelete: boolean) => void
}

// TODO: Refactorizar esto

export const InputItemTable = <T extends Expense | OtherExpense>({ index, fieldKey, value, handleEdit, isDelete, setIsDelete }: Readonly<InputItemProps<T>>) => {
  const [inputValue, setInputValue] = useState<string>(
    fieldKey === "amount" ? priceFormat(parseCurrency(value.toString())) : value.toString()
  );

  useEffect(() => {
    const formattedValue =
      fieldKey === "amount"
        ? priceFormat(parseCurrency(value.toString()))
        : value.toString()

    if (formattedValue !== inputValue) {
      setInputValue(formattedValue)
    }
    setIsDelete(false)

  }, [isDelete])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    setInputValue(rawValue)
    handleEdit(index, fieldKey as keyof T, rawValue)
  }

  const handleBlur = () => {
    const parsedValue = parseCurrency(inputValue)
    handleEdit(index, fieldKey as keyof T, parsedValue.toString())
    setInputValue(priceFormat(parsedValue))

  }

  const handleFocus = () => {
    const stringValue = value.toString().replace('.', ',')
    setInputValue(stringValue === "0" ? "" : stringValue)

  }

  return (
    <input
      type="text"
      value={inputValue}
      onChange={(e) => handleChange(e)}
      onFocus={fieldKey === "amount" ? handleFocus : undefined}
      onBlur={fieldKey === "amount" ? handleBlur : undefined}
      className="w-full bg-transparent rounded-sm m-1 border-none p-2 focus:outline-none focus:bg-custom-dark-gray/50"
    />
  )
}