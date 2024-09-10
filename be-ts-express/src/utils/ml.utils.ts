export const convertCatalogIdToProductId = (catalogId: string) =>
  `MLB-${catalogId.split("MLB")[1]}`

export const sanitizeAmountSold = (amountSold: string): number => {
  console.log("amountSold ====>>", amountSold)
  const addZerosToAmountStr = amountSold
    .replaceAll("mil", "000")
    .replaceAll("mi", "000000")
  const numbersRegex = /\d+/g // Regular expression to match one or more digits
  const matches = addZerosToAmountStr.match(numbersRegex)
  if (matches) return parseInt(matches.join(""))
}
