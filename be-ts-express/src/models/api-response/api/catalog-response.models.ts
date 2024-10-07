import { CatalogReducerResponse } from "../../reducers/catalog-reducer.models"
import { CategoriesChildrenResponse } from "./categories-children-response.model"

export type CatalogApiResponse = CatalogReducerResponse & {
  catalogId: string
  hasVideo: boolean
  revenue: number
  dailyRevenue: number
  quantitySold: number
  category?: CategoriesChildrenResponse
}
