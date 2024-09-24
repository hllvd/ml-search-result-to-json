export const calculateDaysFrom = (dateString: string): number => {
  const startDate = new Date(dateString)
  const currentDate = new Date()
  const timeDifference = currentDate.getTime() - startDate.getTime()
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  return daysDifference
}

export function getEarliestAndLatestDate(dates): {
  startDate: string
  endDate: string
} {
  const dateKeys = Object.keys(dates)
  if (dateKeys.length === 0) {
    throw new Error("No dates found in the object.")
  }
  const sortedDates = dateKeys.sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  )
  const startDate = sortedDates[0]
  const endDate = sortedDates[sortedDates.length - 1]

  return { startDate, endDate }
}
