import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"

/** On catalogs with large list of products, gathering the product length is
 *  a exhaustive task and can causes  time out error.
 * This fufnction help us to get the number of product from the catalog main page so iterate between catalog pages are no needed
 * */
const webScrapeCatalogProductLengthPredicate = async (
  response: AxiosResponse
): Promise<{ response: number }> => {
  const dom = new JSDOM(await response.data)
  const document = dom.window.document
  const purchaseOptions = document.querySelector(
    ".ui-pdp-products .ui-pdp-products__link"
  )
  console.log("purchaseOptions", purchaseOptions)
  const amountStrInner = purchaseOptions.textContent
  const productAmount = _getFirstNumber(amountStrInner)
  console.log("productAmount", productAmount)
  return { response: productAmount }
}

const _getFirstNumber = (text) => {
  const match = text.match(/\d+/)
  return match ? parseInt(match[0], 10) : null
}

export { webScrapeCatalogProductLengthPredicate }
