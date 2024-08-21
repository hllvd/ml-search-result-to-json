export function currencyFormatter(
  number: number | null,
  withSymbol?: boolean
): string {
  if (!number) return ""
  return `${withSymbol && "R$ "}${number.toLocaleString("pt-BR", {
    useGrouping: true,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })}`
}
export function dateIsoFormatter(date: string): string {
  const dateIso = new Date(date)
  return dateIso.toISOString().split("T")[0]
}
