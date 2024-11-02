import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"
import {
  CategoryWebCrawlerPredicateResult,
  CategoryTreeWebCrawler,
} from "../../../../../models/predicate/category-tree.models"

const categoryMetadataPredicate = async (
  response: AxiosResponse
): Promise<{
  response: CategoryWebCrawlerPredicateResult
}> => {
  const dom = new JSDOM(await response.data)
  const document = dom.window.document

  const parentCategory = document.querySelectorAll(
    ".CategoryList .desktop__view-wrapper .desktop__view-child"
  )
  console.log("parentCategory", parentCategory)
  const categoryTree: Array<CategoryTreeWebCrawler> = Array.from(
    parentCategory
  ).map((parentEl: HTMLElement) => {
    const parentLink = parentEl.querySelector("a")
    const url = parentLink.href
    const name = parentEl.querySelector(
      "a .category-list__permalink-custom"
    )?.innerHTML
    const childrenEl = parentEl.querySelector(".desktop__view-ul")
    const childrenList = _getChildrenEl(childrenEl)
    return { url, name, childrenList }
  })

  return { response: { categoryTree } }
}

const _getChildrenEl = (el) => {
  return Array.from(el.querySelectorAll(".category-list__item")).map(
    (childEl: HTMLElement) => {
      const linkEl = childEl.querySelector(
        ".splinter-link"
      ) as HTMLAnchorElement
      const url = linkEl?.href
      const name = linkEl.querySelector("h4")?.textContent
      return { url, name }
    }
  )
}
export { categoryMetadataPredicate }
