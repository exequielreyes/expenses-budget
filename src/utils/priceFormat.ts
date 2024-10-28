export function priceFormat(ammount : number){
    return new Intl.NumberFormat('es-AR',{
        style: "currency",
        currency: "ARS",
        minimumFractionDigits:0,
    }).format(ammount)
}