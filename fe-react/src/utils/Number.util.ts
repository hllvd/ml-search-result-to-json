export const convertToInt = (str?: string | number | null): number => {
  if (typeof str === "number") {
    return Math.floor(str)
  }

  if (typeof str === "string" && !isNaN(parseInt(str, 10))) {
    return parseInt(str, 10)
  }

  return 0
}
