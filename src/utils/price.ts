export function priceFormat(ammount : number){
    return new Intl.NumberFormat('es-AR',{
        style: "currency",
        currency: "ARS",
        minimumFractionDigits:2,
    }).format(ammount)
}

export function parseCurrency(value: string) {
    return parseFloat(value.replace(/[^0-9,.-]/g, '').replace(',', '.')) || 0
  }