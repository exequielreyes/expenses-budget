export function formatTotal(total : number){
    const priceFormated = new Intl.NumberFormat('es-AR',{
        style: "currency",
        currency: "ARS",
        minimumFractionDigits:0,
    })
    const finalTotal = priceFormated.format(total)
    return finalTotal;
}