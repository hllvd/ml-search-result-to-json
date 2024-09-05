import { ProductVisitsResponse } from "../../models/api-response/product-views-response.models"
import { VisitsReducerResponse } from "../../models/reducers/visits-reducer.models"
import { fetchViewsFromProduct } from "./api/product-visits.api.service"
import { productVisitsReducer } from "./reducers/product-visits.reducer.service"

const getProductVisitsSummary = async ({
  userId,
  productId,
}): Promise<VisitsReducerResponse> => {
  const last = 30
  const ending = new Date().toISOString().slice(0, 10)
  const response: ProductVisitsResponse = await fetchViewsFromProduct({
    userId,
    productId,
    last,
    ending,
  })
  return productVisitsReducer([response])
}

export { getProductVisitsSummary }
