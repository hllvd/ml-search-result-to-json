export const calculateDaysFrom = (dateString: string): number => {
  const startDate = new Date(dateString)
  const currentDate = new Date()
  const timeDifference = currentDate.getTime() - startDate.getTime()
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  return daysDifference
}
