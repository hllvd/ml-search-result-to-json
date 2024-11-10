import { CategorySearchTypes } from "../../enums/cateogry-search-types.num"

export interface CategorySearchTerms {
  type: CategorySearchTypes
  text: string
  href: string
}
export interface ScrapeCategoryMetadata {
  searchTerms?: Array<CategorySearchTerms>
  currentCategoryName?: string
  categoryChildren?: Array<{ href: string; text: string }>
}
