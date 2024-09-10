import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"
import { sanitizeAmountSold } from "../../../../../utils/ml.utils"

const webScrapeCatalogToMetadataPredicate = async (
  response: AxiosResponse
): Promise<{ response: number }> => {
  const dom = new JSDOM(await response.data)
  const document = dom.window.document
  const amountHtml = document.querySelector(".ui-pdp-subtitle")
  const amountStrInner = amountHtml.textContent
  const amountInt = sanitizeAmountSold(amountStrInner)
  console.log("amountInt", amountInt)
  return { response: amountInt }
}

export { webScrapeCatalogToMetadataPredicate }
