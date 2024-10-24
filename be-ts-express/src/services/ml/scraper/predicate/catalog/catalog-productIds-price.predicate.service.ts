import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"
import {
  PredicateResponse,
  ProductIdStrAndPriceResponse,
} from "../../../../../models/predicate/predicate-response.models"
import { convertCurrencyStrings } from "../../../../../utils/ml.utils"

/**
 *
 * @param response
 * @returns list of product ids and a boolean indicating if there is a next page
 */
const webScrapeCatalogToProductIdAndPricePredicate = async (
  response: AxiosResponse
): Promise<PredicateResponse<ProductIdStrAndPriceResponse>> => {
  const regex = /\/p\/([^/]+)\//
  const dom = new JSDOM(await response.data)
  const document = dom.window.document
  const buttonWithUrls = Array.from(
    document.querySelectorAll(
      "[formaction^='https://www.mercadolivre.com.br/p/']"
    )
  ).map((el: any) => el.getAttribute("formaction"))

  const prices = Array.from(
    document.querySelectorAll(
      ".ui-pdp-table__cell.ui-pdp-s-table__cell .ui-pdp-price span.andes-money-amount.ui-pdp-price__part.andes-money-amount--cents-superscript.andes-money-amount--compact"
    )
  ).map((el: HTMLElement) =>
    convertCurrencyStrings(el.getAttribute("aria-label"))
  )
  const nextPage = document.querySelector(
    "li.andes-pagination__button.andes-pagination__button--next a"
  )?.href
  const productIds = buttonWithUrls.map((e) => e.match(regex)[1])
  if (productIds.length === 0) throw new Error("No products found")
  const productIdsAndPricesJoin = productIds.map((e, i) => {
    return { productIdStr: e, price: prices[i] }
  })
  return { nextPage, response: productIdsAndPricesJoin }
}

export { webScrapeCatalogToProductIdAndPricePredicate }
