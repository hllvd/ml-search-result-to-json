import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"
import {
  PredicateResponse,
  ProductIdStrAndPriceResponse,
} from "../../../../../models/predicate/predicate-response.models"

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
    _convertCurrencyStrings(el.getAttribute("aria-label"))
  )
  const nextPage =
    Array.from(
      document.querySelectorAll(
        ".li.andes-pagination__button.andes-pagination__button--next.andes-pagination__button--disabled"
      )
    ).length === 0
  const productIds = buttonWithUrls.map((e) => e.match(regex)[1])
  if (productIds.length === 0) throw new Error("No products found")
  const productIdsAndPricesJoin = productIds.map((e, i) => {
    return { productIdStr: e, price: prices[i] }
  })
  return { nextPage, response: productIdsAndPricesJoin }
}

const _convertCurrencyStrings = (currencyStrings: string): number => {
  const addCentavos = currencyStrings.includes("centavos")
    ? currencyStrings
    : `${currencyStrings} com 00 centavos`
  const onlyNumber: number = Number.parseInt(addCentavos.replace(/\D/g, ""))
  const floatNumbers: number = Number.parseFloat((onlyNumber / 100).toFixed(2))
  console.log("floatNumbers", floatNumbers)
  return floatNumbers
}

export { webScrapeCatalogToProductIdAndPricePredicate }
