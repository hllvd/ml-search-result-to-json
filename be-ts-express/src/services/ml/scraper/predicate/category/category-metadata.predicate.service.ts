import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"
import { CategorySearchTypes } from "../../../../../enums/cateogry-search-types.num"
import { ScrapeCategoryMetadata } from "../../../../../models/predicate/category-metadata.models"

const categoryMetadataPredicate = async (
  response: AxiosResponse
): Promise<{
  response: ScrapeCategoryMetadata
}> => {
  const dom = new JSDOM(await response.data)
  const document = dom.window.document

  const searchTermsLinksElements = Array.from(
    document.querySelectorAll(".seo-ui-trends-carousel-wrapper a")
  )
  const searchTerms = searchTermsLinksElements.map((e: HTMLAnchorElement) => {
    const href = e.href
    const name = e.textContent
    const url = new URL(href)
    const fragment = url.hash.split("#")[1]
    const query = new URLSearchParams(fragment)
    const type: CategorySearchTypes = query.get(
      "component_id"
    ) as CategorySearchTypes
    return { type, name, url: href }
  })
  const currentCategoryName = document.querySelector(
    "h2.ui-search-breadcrumb__title"
  )?.textContent

  const categoriesLeftEls = Array.from(
    document.querySelectorAll(".ui-search-filter-dl a")
  )
  const categoryChildren = categoriesLeftEls.map((e: HTMLAnchorElement) => {
    const url = e.href
    const name = e.textContent
    return {
      url,
      name,
    }
  })

  return { response: { searchTerms, categoryChildren, currentCategoryName } }
}

export { categoryMetadataPredicate }
