const slopeCalculate = ({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
}) => {
  if (x2 - x1 != 0) {
    return (y2 - y1) / (x2 - x1)
  }
  return Number.MAX_VALUE
}

const calculateLineOfBestFit = (
  points: Array<{ x: number; y: number }>
): { slope: number; intercept: number } => {
  const n = points.length
  const avgX = points.reduce((sum, point) => sum + point.x, 0) / n
  const avgY = points.reduce((sum, point) => sum + point.y, 0) / n

  const numerator = points.reduce(
    (sum, point) => sum + (point.x - avgX) * (point.y - avgY),
    0
  )
  const denominator = points.reduce(
    (sum, point) => sum + (point.x - avgX) ** 2,
    0
  )
  const slope = numerator / denominator

  const intercept = avgY - slope * avgX

  return { slope, intercept }
}

export default { calculateLineOfBestFit, slopeCalculate }
