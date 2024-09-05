import { ProductVisitsResponse } from "../../models/api-response/product-views-response.models"
import { fetchViewsFromProduct } from "./api/product-visits.api.service"
import { productVisitsReducer } from "./reducers/product-visits.reducer.service"

const _fetchVisitsFromCatalog = async ({
  userId,
  productIds,
}): Promise<ProductVisitsResponse[]> => {
  const last = 30
  const ending = new Date().toISOString().slice(0, 10)
  const productsWithVisits = Promise.all(
    productIds.map(async ({ productIdStr }) => {
      return await fetchViewsFromProduct({
        userId,
        productId: productIdStr,
        last,
        ending,
      })
    })
  )
  return productsWithVisits
}

const getCatalogVisitsSummary = async ({ userId, productIds }) => {
  const cataLogVisits = await _fetchVisitsFromCatalog({ userId, productIds })
  return productVisitsReducer(cataLogVisits)
}

export { getCatalogVisitsSummary }
