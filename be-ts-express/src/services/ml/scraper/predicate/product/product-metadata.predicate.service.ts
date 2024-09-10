import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"
import { sanitizeAmountSold } from "../../../../../utils/ml.utils"

const webScrapeProductPriceAndQuantitySoldPredicate = async (
  response: AxiosResponse
): Promise<{ response: { quantitySold: number; currentPrice: number } }> => {
  const dom = new JSDOM(await response.data)
  const document = dom.window.document

  const amountHtml = document.querySelector(".ui-pdp-subtitle")
  const amountStrInner = amountHtml.textContent
  const quantitySold = sanitizeAmountSold(amountStrInner)

  const priceHtml = document.querySelector("meta[itemprop=price]")
  const priceStr = priceHtml.getAttribute("content")
  const currentPrice = Number.parseFloat(priceStr)

  return { response: { currentPrice, quantitySold } }
}
export { webScrapeProductPriceAndQuantitySoldPredicate }
