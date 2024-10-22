import { AxiosResponse } from "axios"
import {
  PredicateResponse,
  ProductIdStrAndPriceResponse,
} from "../../../../../models/predicate/predicate-response.models"
import { JSDOM } from "jsdom"
import { convertCurrencyStrings } from "../../../../../utils/ml.utils"

const webScrapeSearchResultToIdAndPricePredicate = async (
  response: AxiosResponse
): Promise<PredicateResponse<ProductIdStrAndPriceResponse>> => {
  const regex = /MLB-?\d+/
  const dom = new JSDOM(await response.data)
  const document = dom.window.document
  var gridResultItems = document.querySelectorAll(
    ".ui-search-layout li.ui-search-layout__item"
  )
  //   const gridResultItemsFiltered = Array.from(gridResultItems).filter(
  //     (el: HTMLSelectElement) => {
  //       const link = el
  //         .querySelector("h2.poly-box.poly-component__title a")
  //         .getAttribute("href")

  //       return (
  //         link.startsWith("https://produto") ||
  //         link.startsWith("https://www.mercado")
  //       )
  //     }
  //   )

  const linkPriceAndId = Array.from(gridResultItems).map(
    (el: HTMLSelectElement, i: number) => {
      const link = el
        .querySelector("h2.poly-box.poly-component__title a")
        .getAttribute("href")

      if (
        !link.startsWith("https://produto") &&
        !link.startsWith("https://www.mercado")
      ) {
        return null
      }
      const isProduct = link?.includes("MLB-") ?? false
      const price =
        el
          .querySelector(
            "span.andes-money-amount.andes-money-amount--cents-superscript"
          )
          .getAttribute("aria-label") ?? "00"
      //   const id = link.match(regex)
      //   console.log("id", id)
      return { link, isProduct, i, price: convertCurrencyStrings(price) }
    }
  )
  const linkPriceAndIdFiltered = linkPriceAndId.filter((e) => e !== null)
  const linkPriceAndIdFilteredWithId = linkPriceAndIdFiltered.map((e) => {
    return { ...e, id: e.link.match(regex)[0] }
  })

  const nextPage =
    Array.from(
      document.querySelectorAll(
        ".li.andes-pagination__button.andes-pagination__button--next.andes-pagination__button--disabled"
      )
    ).length === 0

  if (linkPriceAndId.length === 0) throw new Error("Page not found")

  //   const productIdsAndPrices = linkPriceAndId.map(
  //     ({ id: productIdStr, price }, i) => {
  //       return { productIdStr, price }
  //     }
  //   )
  return { nextPage, response: linkPriceAndIdFilteredWithId as any }
}

export { webScrapeSearchResultToIdAndPricePredicate }
