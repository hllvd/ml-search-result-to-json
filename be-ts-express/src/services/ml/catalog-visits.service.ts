import { ProductVisitsResponse } from "../../models/api-response/product-views-response.models"
import { ProductIdStrAndPriceResponse } from "../../models/predicate/predicate-response.models"
import { fetchViewsFromProduct } from "./api/product-visits.api.service"

const _fetchVisitsFromCatalog = async ({
  userId,
  productIds,
}): Promise<ProductVisitsResponse[]> => {
  const last = 5
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

const getCatalogVisitsSummary = ({ userId, productIds }) => {
  const cataLogVisits = _fetchVisitsFromCatalog({ userId, productIds })
}

export { getCatalogVisitsSummary }
