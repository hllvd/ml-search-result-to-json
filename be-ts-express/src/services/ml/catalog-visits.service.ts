import { ProductVisitsResponse } from "../../models/api-response/product-views-response.models"
import { ProductIdStrAndPriceResponse } from "../../models/predicate/predicate-response.models"
import { fetchViewsFromProduct } from "./api/product-visits.api.service"

const fetchVisitsFromCatalog = async ({
  userId,
  productIds,
}): Promise<ProductVisitsResponse[]> => {
  const last = 5
  const ending = "2023-12-31"

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

export { fetchVisitsFromCatalog }
