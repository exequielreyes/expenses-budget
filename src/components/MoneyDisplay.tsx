'use client'

import { useAmount } from "@hooks/useAmount";
import { Money } from "../types/types";
import { IconButton } from "@components";
import { CloseEyeIcon, OpenEyeIcon } from "@icons";
import NumberFlow from "@number-flow/react";
import { useEffect, useRef, useState } from "react";

interface MoneyDisplay {
  amount: number
  amountType: Money
  edit?: boolean
}

export const MoneyDisplay = ({ amount, amountType, edit = false }: MoneyDisplay) => {
  const { textColor, isAmountVisible, changeVisibility } = useAmount(amountType);
  const [showInput, setShowInput] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showInput])

  return (
    <div className="flex gap-2 w-full justify-between">
      {
        isAmountVisible
          ?
          <NumberFlow
            value={amount}
            format={{ style: 'currency', currency: 'ARS' }}
            className={`text-4xl font-semibold ${textColor}`}
            onClick={() => edit ? setShowInput(true) : null}
          />
          :
          <p className={`text-4xl font-semibold pt-[7px] ${textColor}`}>$ *****</p>
      }
      <IconButton onClick={changeVisibility}>
        {isAmountVisible
          ? <OpenEyeIcon className="size-6 stroke-custom-gray transition-all duration-200 hover:stroke-custom-light-gray" />
          : <CloseEyeIcon className="size-6 stroke-custom-gray transition-all duration-200 hover:stroke-custom-light-gray" />}
      </IconButton>
    </div>
  )
}

