import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"

const webScrapeProductPricePredicate = async (
  response: AxiosResponse
): Promise<{ response: number }> => {
  const dom = new JSDOM(await response.data)
  const document = dom.window.document
  const amountHtml = document.querySelector("meta[itemprop=price]")
  console.log("amountHtml", amountHtml)
  const amountStr = amountHtml.getAttribute("content")
  const amountFloat = Number.parseFloat(amountStr)
  console.log("amountInt", amountFloat)
  return { response: amountFloat }
}
export { webScrapeProductPricePredicate }
