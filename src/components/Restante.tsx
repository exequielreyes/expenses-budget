"use client"

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
} from "@components/ui/card"
import { ChartConfig, ChartContainer } from "@components/ui/chart"
import { useGastoTotal } from "@hooks/useGastoTotal"
import { useIngresos } from "@hooks/useIngresos"
import NumberFlow from "@number-flow/react"
import { useGastosVarios } from "@hooks"
import { obtenerDineroRestante, obtenerGradosRestantes } from "@lib"



const chartConfig = {
} satisfies ChartConfig

const RestanteItem = ({ title, amount }: { title: string, amount: number }) => {
  return (
    <div className="flex w-full justify-between gap-2">
      <p className="text-white font-normal text-lg" >{title}</p>
      <NumberFlow
        value={amount}
        format={{ style: 'currency', currency: 'ARS' }}
        className={`${amount > 0 ? "text-custom-green" : "text-custom-red"} text-xl font-medium`}
      />
    </div>
  )
}

export function Restante() {

  const { gastoTotal } = useGastoTotal()
  const { sueldo } = useIngresos()
  const { gastoDiario } = useGastosVarios()
  const dineroRestante = obtenerDineroRestante(sueldo, gastoTotal)
  const gradosRestantes = obtenerGradosRestantes(sueldo, gastoTotal)
  const restanteDeGastosDiarios = obtenerDineroRestante(sueldo, gastoDiario)
  

  return (
    <Card className="flex flex-col bg-transparent border-none">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={
              [
                { amount: gastoTotal, fill: "var(--custom-green)" },
              ]
            }
            endAngle={gradosRestantes}
            innerRadius={100}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              strokeWidth={8}
              className="first:fill-muted last:fill-transparent stroke-custom-gray"
              polarRadius={[100]}
            />
            <RadialBar dataKey="amount" />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {`${Math.max(0, Math.trunc((dineroRestante * 100 / sueldo) * 100) / 100)}%`}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <section className="flex flex-col items-center gap-6">
        <h2 className="font-semibold text-custom-light-gray text-[28px]" >¿Cuánto me queda?</h2>
        <div className="w-full flex flex-col items-center gap-2">
          <RestanteItem title="Restante" amount={dineroRestante} />
          <RestanteItem title="Restante de gastos diarios" amount={restanteDeGastosDiarios} />
        </div>
      </section>
    </Card>
  )
}
