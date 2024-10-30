'use client';

import { ChangeEvent, useEffect, useState } from "react";
import { Expense } from "../types/types";
import { parseCurrency, priceFormat } from "@utils";

type InputItemProps = {
  index: number,
  fieldKey: keyof Expense,
  value: string | number,
  handleEdit: (index: number, key: keyof Expense, value: string) => void
  isDelete: boolean,
  setIsDelete: (isDelete: boolean) => void
}

// TODO: Refactorizar esto

export const InputItemTable = ({ index, fieldKey, value, handleEdit, isDelete, setIsDelete }: Readonly<InputItemProps>) => {
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
    handleEdit(index, fieldKey as keyof Expense, rawValue)
  }

  const handleBlur = () => {
    if (fieldKey === "amount") {
      const parsedValue = parseCurrency(inputValue)
      handleEdit(index, fieldKey as keyof Expense, parsedValue.toString())
      setInputValue(priceFormat(parsedValue))
    }
  }

  const handleFocus = () => {
    if (fieldKey === "amount") {
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
      className="w-full bg-transparent border-none p-3 focus:outline-none focus:bg-custom-dark-gray"
    />
  )
}