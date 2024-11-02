import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"
import { CategoryData } from "../../../../../models/predicate/category-tree.models"

const categoryChildrenPredicate = async (
  response: AxiosResponse
): Promise<{
  response: Array<CategoryData>
}> => {
  const dom = new JSDOM(await response.data)
  const document = dom.window.document

  const categoryChildrenEls =
    document.querySelectorAll(
      ".ui-search-filter-container > .ui-search-link"
    ) || document.querySelectorAll(".ui-search-search-modal-null a")

  const categoryChildren: Array<CategoryData> = Array.from(
    categoryChildrenEls
  ).map((e: HTMLAnchorElement) => ({ name: e.textContent, url: e.href }))

  return { response: categoryChildren }
}

export interface CategoryRootPredicateResponse extends CategoryData {
  name: string
  url: string
  childrenList: Array<CategoryData>
}
const categoryRootPredicate = async (
  response: AxiosResponse
): Promise<{
  response: Array<CategoryRootPredicateResponse>
}> => {
  const dom = new JSDOM(await response.data)
  const document = dom.window.document

  const parentCategory = document.querySelectorAll(".categories__container")

  const categoryTree: Array<CategoryRootPredicateResponse> = Array.from(
    parentCategory
  ).map((parentEl: HTMLElement) => {
    const parentLink = parentEl.querySelector("a") as HTMLAnchorElement
    const url = parentLink?.href
    const name = parentEl.querySelector(".categories__title")?.textContent || ""
    const childrenEl = parentEl.querySelector(".categories__list")
    const childrenList = _getChildrenEl(childrenEl)
    return { url, name, childrenList }
  })

  return { response: categoryTree }
}

const _getChildrenEl = (
  el: Element | null
): Array<{ url?: string; name?: string }> => {
  if (!el) return [] // Check if `el` is null
  return Array.from(el.querySelectorAll(".categories__item")).map((childEl) => {
    const linkEl = childEl.querySelector(
      "a.categories__subtitle"
    ) as HTMLAnchorElement | null
    const url = linkEl?.href
    const name = linkEl?.querySelector("h3")?.textContent || ""
    return { url, name }
  })
}

export { categoryChildrenPredicate, categoryRootPredicate }
