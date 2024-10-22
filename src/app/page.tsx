import { BentoItemContainer } from "@components/BentoItemContainer";
import { GastosVarios } from "@components/GastosVarios";
import { LargeNumber } from "@components/LargeNumber";
import { TablaGastos } from "@components/TablaGastos";

export default function Home() {
  return (
    <main className="m-auto max-w-[1670px] h-[calc(100vh-100px)]">
      <div className="grid grid-cols-19 grid-rows-12 gap-6 p-4 w-full h-full">
        <TablaGastos className="col-span-8 row-span-12 row-start-1 col-start-1" />
        <LargeNumber
          className="col-start-9 col-span-4 row-span-2 row-start-1"
          title="Sueldo"
          content="533.431,12"
          amountType="ingreso"
        />
        
        <GastosVarios className="col-start-13 col-span-3 row-span-5 row-start-1" />

        <BentoItemContainer className="col-start-16 col-span-4 row-span-5 row-start-1">
          <h1>Gastos boludos</h1>
        </BentoItemContainer>

        <LargeNumber
          className="col-start-9 row-start-3 col-span-4 row-span-2"
          title="Gasto total"
          content="3.00"
          amountType="gasto"
        />

        <BentoItemContainer className="col-start-9 row-start-6 col-span-5 row-span-5">
          <h1>Cuanto me queda</h1>
        </BentoItemContainer>
        <BentoItemContainer className="col-start-14 row-start-6 col-span-6 row-span-7">
          <h1>Gastos fijos</h1>
        </BentoItemContainer>
      </div>

    </main>
  );
}
