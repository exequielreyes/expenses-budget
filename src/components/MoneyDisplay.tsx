
import { useAmount } from "@hooks/useAmount";
import { OpenEyeIcon } from "@icons/OpenEye";
import { CloseEyeIcon } from "@icons/CloseEye";
import { IconButton } from "@components/IconButton";
import { Money } from "../types/types";

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
