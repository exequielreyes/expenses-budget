'use client'

import { useAmount } from "@hooks/useAmount";
import { Money } from "../types/types";
import { IconButton } from "@components";
import { CloseEyeIcon, OpenEyeIcon } from "@icons";
import NumberFlow from "@number-flow/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

interface MoneyDisplay {
  amount: number
  amountType: Money
  setAmount?: (amount: number) => void
  edit?: boolean
}

export const MoneyDisplay = ({ amount, amountType, setAmount, edit = false }: MoneyDisplay) => {
  const { textColor, isAmountVisible, changeVisibility } = useAmount(amountType);
  const [showInput, setShowInput] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showInput])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (setAmount) {
      setAmount(value === "" ? 0 : parseFloat(value))
    }
  }

  const handleBlur = () => {
    setShowInput(false)
  }
  return (
    <div className="flex gap-2 w-full justify-between">
      {
        isAmountVisible
          ? (
            showInput
              ?
              <div className="mb-[14px]">
                <input
                ref={inputRef}
                type="number"
                value={amount === 0 ? '' : amount}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`text-4xl font-semibold w-56 ${textColor} bg-transparent border-none focus:outline-none`}
              />
              </div>
              :
              <NumberFlow
                value={amount}
                format={{ style: 'currency', currency: 'ARS' }}
                className={`text-4xl font-semibold ${textColor}`}
                onClick={() => edit ? setShowInput(true) : null}
              />
          )
          :
          <p className={`text-4xl font-semibold pt-[7px] ${textColor}`}>$ *****</p>
      }
      <IconButton onClick={changeVisibility}>
        {isAmountVisible ? <OpenEyeIcon className="size-6 stroke-custom-gray transition-all duration-200 hover:stroke-custom-light-gray" /> : <CloseEyeIcon className="size-6 stroke-custom-gray transition-all duration-200 hover:stroke-custom-light-gray" />}
      </IconButton>
    </div>
  )
}

