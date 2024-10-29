export const obtenerDineroRestante = (ingreso: number, gasto: number): number => {
  if (isNaN(ingreso)) return 0
  if (isNaN(gasto) || gasto < 0) gasto = 0

  return ingreso - gasto
}

export const obtenerGradosRestantes = (ingreso: number, gasto: number): number => {
  if (isNaN(ingreso) || ingreso <= 0) return 0
  if (isNaN(gasto) || gasto < 0) gasto = 0

  const dineroRestante = Math.max(0, ingreso - gasto)
  return Math.min((dineroRestante / ingreso) * 360, 360)
}