export function getMonthRange(date: string) {
  const inputDate = new Date(date)

  const startOfMonth = new Date(inputDate.getUTCFullYear(), inputDate.getUTCMonth(), 1)
  const startOfNextMonth = new Date(inputDate.getUTCFullYear(), inputDate.getUTCMonth() + 1, 1)

  const formatDate = (date: Date) => date.toISOString().split('T')[0]

  return {
    startOfMonth: formatDate(startOfMonth),
    startOfNextMonth: formatDate(startOfNextMonth),
  }
}