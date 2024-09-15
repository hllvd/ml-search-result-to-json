import { Request } from "express"
import { ProductApiResponse } from "../../api-response/api/product-response.models"
export interface RequestExtended extends Request {
  persistency?: PersistencyInfo
}
export interface PersistencyInfo {
  productInfo?: ProductApiResponse
}
