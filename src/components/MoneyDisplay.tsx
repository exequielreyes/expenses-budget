interface MoneyDisplay {
  amount: string
  hide: boolean
}

export const MoneyDisplay = ({ amount, hide }: MoneyDisplay) => {
  const displayValue = hide ? `$${'*'.repeat(amount.toString().replaceAll(',', '').replaceAll('.', '').length)}` : `$${amount}`
  // const displayValue = hide ? '$****' : `$${amount}`

  // TODO: Le dejamos un numero fijo de * o dependiendo del monto?

  return (
    <>
      {displayValue}
    </>
  ) 
}
