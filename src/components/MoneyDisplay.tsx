
import { useAmount } from "@hooks/useAmount";
import { Money } from "../types/types";
import { IconButton } from "@components";
import { CloseEyeIcon, OpenEyeIcon } from "@icons";

interface MoneyDisplay {
  amount: string
  amountType: Money
}

export const MoneyDisplay = ({ amount, amountType }: MoneyDisplay) => {
  const { textColor, isAmountVisible, changeVisibility } = useAmount(amountType);

  return (
    <>
      <p className={`text-4xl font-semibold ${textColor}`}>
        {
          isAmountVisible
            ? `$${amount}`
            : '$*****'
        }
      </p>
      <IconButton onClick={changeVisibility}>
        {isAmountVisible ? <OpenEyeIcon className="size-6 stroke-custom-gray" /> : <CloseEyeIcon className="size-6 stroke-custom-gray" />}
      </IconButton>
    </>
  )
}
