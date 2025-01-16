export const truncateString = (
  str: string,
  maxLength: number,
  suffix = "..."
) => {
  return str.length > maxLength ? `${str.slice(0, maxLength)}${suffix}` : str
}
