import { ProductVisitsApiResponse } from "../../models/api-response/api/product-visits-response.models"
import { ProductVisitsMlResponse } from "../../models/api-response/ml/product-views-response.models"
import { fetchViewsFromProduct } from "./api/product-visits.api.service"
import { productVisitsReducer } from "./reducers/product-visits.reducer.service"

const getProductVisitsSummary = async ({
  userId,
  productId,
}): Promise<ProductVisitsApiResponse> => {
  const last = 30
  const ending = new Date().toISOString().slice(0, 10)
  const response: ProductVisitsMlResponse = await fetchViewsFromProduct({
    userId,
    productId,
    last,
    ending,
  })
  const visitsReducer = productVisitsReducer([response])
  return visitsReducer
}

export { getProductVisitsSummary }
