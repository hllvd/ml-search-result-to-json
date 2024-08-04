import { ProductId } from "aws-sdk/clients/sagemaker"
import { MLProduct } from "../../../models/dto/ml-product.models"
import { fetchMl } from "../fetcher-api.ml.service"

const getProducts = async (
  userId: string,
  productIds: ProductId[]
): Promise<MLProduct[]> => {
  const options = {
    userId,
    method: "GET",
  }
  const productIdStr = productIds.join(",")
  const productsObj = await fetchMl(`/items?ids=${productIdStr}`, options)
  return productsObj
    .filter((product) => product.code === 200)
    .map((product) => product.body)
}

export { getProducts }
