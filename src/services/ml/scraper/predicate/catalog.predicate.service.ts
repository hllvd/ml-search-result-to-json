import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"
import { ProductId } from "../../../../models/dto/ml-product.models"

/**
 *
 * @param response
 * @returns list of product ids and a boolean indicating if there is a next page
 */
const webScrapeCatalogToProductIdAndPricePredicate = async (
  response: AxiosResponse
): Promise<{
  nextPage: boolean
  response: ProductId[]
  prices: Array<number>
}> => {
  const regex = /\/p\/([^/]+)\//
  const dom = new JSDOM(await response.data)
  const document = dom.window.document
  const buttonWithUrls = Array.from(
    document.querySelectorAll(".andes-button.ui-pdp-action--secondary")
  ).map((el: any) => el.getAttribute("formaction"))

  const prices = Array.from(
    document.querySelectorAll(
      ".andes-money-amount.ui-pdp-price__part.andes-money-amount--cents-superscript.andes-money-amount--compact"
    )
  ).map((el: HTMLElement) => _convertCurrencyStrings(el.textContent))

  const nextPage =
    Array.from(
      document.querySelectorAll(
        ".li.andes-pagination__button.andes-pagination__button--next.andes-pagination__button--disabled"
      )
    ).length === 0
  const productIds = buttonWithUrls.map((e) => e.match(regex)[1])
  if (productIds.length === 0) throw new Error("No products found")
  return { nextPage, response: productIds, prices }
}

const webScrapeCatalogToMetadataPredicate = async (
  response: AxiosResponse
): Promise<{ response: number }> => {
  const dom = new JSDOM(await response.data)
  const document = dom.window.document
  const amountStr = document.querySelectorAll(
    ".ui-pdp-container__col.col-2.mr-32 .ui-pdp-header .ui-pdp-subtitle"
  ).innerHTML
  if (amountStr == null) throw new Error("No catalog amount found")

  const amountInt = _sanitizeAmounSold(amountStr)

  return { response: amountInt }
}

const _convertCurrencyStrings = (currencyStrings: string): number => {
  let numberString = currencyStrings.replace(/R\$\s*/, "").replace(",", ".")
  const parsedfloat = parseFloat(numberString)
  return parsedfloat
}

const _sanitizeAmounSold = (amountSold: string): number => {
  const addZerosToAmountStr = amountSold
    .replaceAll("mil", "000")
    .replaceAll("mi", "000000")
  const numbersRegex = /\d+/g // Regular expression to match one or more digits
  const matches = addZerosToAmountStr.match(numbersRegex)
  if (matches) return parseInt(matches.join(""))
}
export {
  webScrapeCatalogToProductIdAndPricePredicate,
  webScrapeCatalogToMetadataPredicate,
}
