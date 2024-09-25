import { VisitsReducerResponse } from "../../reducers/visits-reducer.models"

export type ProductVisitsApiResponse = VisitsReducerResponse & {
  productId?: string
}
