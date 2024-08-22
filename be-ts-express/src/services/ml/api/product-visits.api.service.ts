import { ProductVisitsResponse } from "../../../models/api-response/product-views-response.models"
import { fetchMl } from "../fetcher-api.ml.service"

const fetchViewsFromProduct = async ({
  userId,
  productId,
  last,
  ending,
}: {
  userId: string
  productId: string
  last: number
  ending: string
}): Promise<ProductVisitsResponse> => {
  const options = {
    userId,
    method: "GET",
  }
  if (typeof last !== "number") throw new Error("last must be a number")
  if (typeof ending !== "string") throw new Error("ending must be a string")
  const url = `/items/${productId}/visits/time_window?last=${last.toString()}&unit=day&ending=${ending.toString()}`
  console.log(url)
  const productViews = await fetchMl(url, options)
  return productViews
}

export { fetchViewsFromProduct }
