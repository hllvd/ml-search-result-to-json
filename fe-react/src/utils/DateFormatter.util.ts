export function daysFromNow(date: string): string {
  const date1 = new Date(date)
  const date2 = new Date()
  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  if (diffDays > 0) {
    return `${diffDays} dias atrás`
  }
  return ""
}
