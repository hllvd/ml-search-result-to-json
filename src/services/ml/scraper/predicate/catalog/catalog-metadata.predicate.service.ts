import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"

const webScrapeCatalogToMetadataPredicate = async (
  response: AxiosResponse
): Promise<{ response: number }> => {
  const dom = new JSDOM(await response.data)
  const document = dom.window.document
  const amountHtml = document.querySelector(".ui-pdp-subtitle")
  const amountStrInner = amountHtml.textContent
  const amountInt = _sanitizeAmountSold(amountStrInner)
  console.log("amountInt", amountInt)
  return { response: amountInt }
}

const _sanitizeAmountSold = (amountSold: string): number => {
  console.log("amountSold ====>>", amountSold)
  const addZerosToAmountStr = amountSold
    .replaceAll("mil", "000")
    .replaceAll("mi", "000000")
  const numbersRegex = /\d+/g // Regular expression to match one or more digits
  const matches = addZerosToAmountStr.match(numbersRegex)
  if (matches) return parseInt(matches.join(""))
}

export { webScrapeCatalogToMetadataPredicate }
