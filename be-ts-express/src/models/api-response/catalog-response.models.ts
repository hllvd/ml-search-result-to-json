import { CatalogReducerResponse } from "../reducers/catalog-reducer.models"

export type CatalogResponse = CatalogReducerResponse & {
  catalogId: string
}
