import { MLProduct } from "../../../models/dto/ml-product.models"
import { FetchProductArgument } from "../../../models/params/fetch-product.model"
import { fetchMl } from "../fetcher-api.ml.service"

const fetchProducts = async (
  userId: string,
  productIdStr: string
): Promise<MLProduct[]> => {
  const options = {
    userId,
    method: "GET",
  }
  const productsObj = await fetchMl(`/items?ids=${productIdStr}`, options)
  return productsObj
    .filter((product) => product.code === 200)
    .map((product) => product.body)
}

const fetchProduct = async ({
  userId,
  productId,
}: FetchProductArgument): Promise<MLProduct> => {
  const options = {
    userId,
    method: "GET",
  }
  const productsObj = await fetchMl(`/items/${productId}`, options)
  return productsObj
}

export { fetchProducts, fetchProduct }
