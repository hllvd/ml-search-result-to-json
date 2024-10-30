import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"
import { CategoryTreeWebCrawler } from "../../../../../models/predicate/category-tree.models"
import { sanitizeAmountSold } from "../../../../../utils/ml.utils"

const categoryMetadataPredicate = async (
  response: AxiosResponse
): Promise<{
  response: { categoryTree: Array<CategoryTreeWebCrawler> }
}> => {
  const dom = new JSDOM(await response.data)
  const document = dom.window.document

  const parentCategory = document.querySelectorAll(
    ".CategoryList .desktop__view-wrapper .desktop__view-child"
  )
  const categoryTree: Array<CategoryTreeWebCrawler> = Array.from(
    parentCategory
  ).map((parentEl: HTMLElement) => {
    const parentLink = parentEl.querySelector("a")
    const parentUrl = parentLink.href
    const parentName = parentEl.querySelector(
      "a .category-list__permalink-custom"
    )?.innerHTML
    const childrenEl = parentEl.querySelector(".desktop__view-ul")
    const childrenList = _getChildrenEl(childrenEl)
    return { parentUrl, parentName, childrenList }
  })

  /** 
  const dom = new JSDOM(await response.data)
  const document = dom.window.document

  const amountHtml = document.querySelector(".ui-pdp-subtitle")
  const amountStrInner = amountHtml.textContent
  const quantitySold = sanitizeAmountSold(amountStrInner)

  const priceHtml = document.querySelector("meta[itemprop=price]")
  const priceStr = priceHtml.getAttribute("content")
  const currentPrice = Number.parseFloat(priceStr)

  const clipIconHtml = document.querySelectorAll(
    ".ui-pdp-thumbnail--overlay .clip-picture-icon"
  )
  const hasVideo = !!clipIconHtml
  **/

  return { response: { categoryTree } }
}

const _getChildrenEl = (el) => {
  return Array.from(el.querySelectorAll(".category-list__item")).map(
    (childEl: HTMLElement) => {
      const linkEl = childEl.querySelector(
        ".splinter-link"
      ) as HTMLAnchorElement
      const childUrl = linkEl?.href
      const childName = linkEl.querySelector("h4")?.textContent
      return { childUrl, childName }
    }
  )
}
export { categoryMetadataPredicate }
