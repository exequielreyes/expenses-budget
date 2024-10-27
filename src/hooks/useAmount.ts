'use client'

import { useState } from "react";
import { Money } from "../types/types";

export const useAmount = (amount: Money) => {

  const [isAmountVisible, setIsAmountVisible] = useState(true);

  const changeVisibility = () => {
    setIsAmountVisible(!isAmountVisible);
  }
  
  const setColor = (amount: Money) => {
    if (amount === 'ingreso') {
      return 'text-custom-green'
    } else if (amount === 'gasto') {
      return 'text-custom-yellow'
    } else if (amount === 'perdida') {
      return 'text-custom-red'
    }
    return ''
  }

  return {
    textColor: setColor(amount),
    isAmountVisible,
    changeVisibility
  }

};