export const roundNumber = (num: number) => parseFloat(num.toFixed(2))

export const calculateDispersion = (
  series: number[]
): { mean: number; variance: number; stdDev: number; cv: number } => {
  const totalDays = series.length
  const mean = series.reduce((acc, click) => acc + click, 0) / totalDays
  const variance =
    series.reduce((acc, click) => acc + Math.pow(click - mean, 2), 0) /
    totalDays
  const stdDev = Math.sqrt(variance)
  const cv = mean === 0 ? 0 : (stdDev / mean) * 100
  return {
    mean,
    variance,
    stdDev,
    cv, // Coefficient of Variation
  }
}
