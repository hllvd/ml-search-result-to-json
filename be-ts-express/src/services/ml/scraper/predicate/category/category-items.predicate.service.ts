import { AxiosResponse } from "axios"
import {
  PredicateResponse,
  ProductIdStrAndPriceResponse,
} from "../../../../../models/predicate/predicate-response.models"
import { JSDOM } from "jsdom"
import { convertCurrencyStrings } from "../../../../../utils/ml.utils"
import { minimalPathUrl } from "../../../../../utils/url.util"

const categoryItemsPredicate = async (
  response: AxiosResponse
): Promise<PredicateResponse<ProductIdStrAndPriceResponse>> => {
  const regex = /MLB-?\d+/
  const dom = new JSDOM(await response.data)
  const document = dom.window.document
  const gridResultItems = document.querySelectorAll(
    ".ui-search-layout li.ui-search-layout__item"
  )
  console.log("gridResultItems", Array.from(gridResultItems).length)

  const linkPriceAndId = Array.from(gridResultItems).map(
    (el: HTMLSelectElement, i: number) => {
      const currentEl = el.querySelector("a")

      if (currentEl == null) return null

      const link = minimalPathUrl(currentEl.getAttribute("href"))
      const name = currentEl?.textContent
      console.log(name)
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
      return { link, isProduct, price: convertCurrencyStrings(price), name }
    }
  )

  const linkPriceAndIdFiltered = linkPriceAndId.filter((e) => e !== null)
  let i = 1
  const linkPriceAndIdFilteredWithIdAndIndex = linkPriceAndIdFiltered.map(
    (e) => {
      const index = i++
      const id = e.link.match(regex)[0]?.replace("-", "")
      return { ...e, id, index: index }
    }
  )

  const nextPage = document.querySelector(
    "li.andes-pagination__button andes-pagination__button--next a"
  )?.href

  if (linkPriceAndId.length === 0) throw new Error("Page not found")

  return { nextPage, response: linkPriceAndIdFilteredWithIdAndIndex as any }
}

export { categoryItemsPredicate }
