import { CategorySearchTypes } from "../../enums/cateogry-search-types.num"

export interface CategorySearchTerms {
  type: CategorySearchTypes
  text: string
  href: string
}
export interface ScrapeCategoryMetadata {
  searchTerms: Array<CategorySearchTerms>
  categoriesMenu: Array<{ href: string; text: string }>
}
