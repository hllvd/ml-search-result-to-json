import { ProductId } from "../dto/ml-product.models"

export interface PredicateResponse<T> {
  nextPage?: boolean
  response: Array<T>
}
export interface ProductIdStrAndPriceResponse {
  productIdStr: ProductId
  price: number
}
