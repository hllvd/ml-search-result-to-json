import { Categories } from "../../../entities/sql/categories.entity"
import { CatalogReducerResponse } from "../../reducers/catalog-reducer.models"

export type CatalogApiResponse = CatalogReducerResponse & {
  catalogId: string
  hasVideo: boolean
  revenue: number
  dailyRevenue: number
  quantitySold: number
  category?: Categories
}
