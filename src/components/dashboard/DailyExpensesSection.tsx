import { BentoItemContainer } from "@components/BentoItemContainer"
// import GastoVarioItem from "@components/GastosVariosItem"


export default async function DailyExpensesSection() {

  return (
    <BentoItemContainer>
      <div className="flex flex-col gap-7">
        {/* {
          gastosVarios.map((gasto, index) => {
            return <GastoVarioItem key={index} gasto={gasto} />
          })
        } */}
      </div>
    </BentoItemContainer>
  )
}