'use client'

import { useAmount } from "@hooks/useAmount";
import { Money } from "../types/types";
import { IconButton } from "@components";
import { CloseEyeIcon, OpenEyeIcon } from "@icons";
import NumberFlow from "@number-flow/react";
import { ChangeEvent, useState } from "react";
import { parseCurrency, priceFormat } from "@utils";

interface MoneyDisplay {
  amount: number
  amountType: Money
  setAmount?: (amount: number) => void
  edit?: boolean
}

export const MoneyDisplay = ({ amount, amountType, setAmount, edit = false }: MoneyDisplay) => {
  const { textColor, isAmountVisible, changeVisibility } = useAmount(amountType);
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value
    setInputValue(rawValue)
  }

  const handleBlur = () => {
    const parsedValue = parseCurrency(inputValue)
    if (setAmount) {
      setAmount(parsedValue)
    }
    setInputValue(priceFormat(parsedValue))
  }

  const handleFocus = () => {
    setInputValue(amount.toString().replace('.', ','))
  }

  return (
    <>
      {
        isAmountVisible
          ? (
            edit
              ?
              <input type="text" value={inputValue} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} className={`text-4xl font-semibold w-64 bg-custom-black ${textColor}`} />
              :
              <NumberFlow
                value={amount}
                format={{ style: 'currency', currency: 'ARS' }}
                className={`text-4xl font-semibold ${textColor}`}
              />
          )
          :
          <p className={`text-4xl font-semibold ${edit ? '' : 'pt-[7px]'} ${textColor}`}>$ *****</p>
      }
      <IconButton onClick={changeVisibility}>
        {isAmountVisible ? <OpenEyeIcon className="size-6 stroke-custom-gray" /> : <CloseEyeIcon className="size-6 stroke-custom-gray" />}
      </IconButton>
    </>
  )
}

