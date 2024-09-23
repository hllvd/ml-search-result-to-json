import { CatalogReducerResponse } from "../../reducers/catalog-reducer.models"

export type CatalogApiResponse = CatalogReducerResponse & {
  catalogId: string
  hasVideo: boolean
  revenue: number
  dailyRevenue: number
  quantitySold: number
}
