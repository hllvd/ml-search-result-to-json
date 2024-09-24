import { Request } from "express"
import { CatalogApiResponse } from "../../api-response/api/catalog-response.models"
import { CatalogVisitsApiResponse } from "../../api-response/api/catalog-visits-response.models"
import { ProductApiResponse } from "../../api-response/api/product-response.models"
export interface RequestExtended extends Request {
  persistency?: PersistencyInfo
}
export interface PersistencyInfo {
  productInfo?: ProductApiResponse
  catalogInfo?: CatalogApiResponse
  catalogViewsInfo?: CatalogVisitsApiResponse
}
