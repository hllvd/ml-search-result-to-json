import { CategorySearchTypes } from "../../enums/cateogry-search-types.num"
import { CategoryData } from "./category-tree.models"

export interface CategorySearchTerms {
  type: CategorySearchTypes
  name: string
  url: string
}
export interface ScrapeCategoryMetadata {
  searchTerms?: Array<CategorySearchTerms>
  currentCategoryName?: string
  categoryChildren?: Array<CategoryData>
}
