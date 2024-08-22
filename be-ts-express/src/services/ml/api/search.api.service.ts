import { ProductId } from "aws-sdk/clients/sagemaker"
import { MLProduct } from "../../../models/dto/ml-product.models"
import { fetchMl } from "../fetcher-api.ml.service"
import { productIdsReducer } from "../reducers/product-urls.reducer.service"

const getProductInCorrectOrder = (
  productIds: ProductId[],
  products: MLProduct[]
): MLProduct[] => {
  return productIds.map((productId) => {
    const product = products.find((product) => product.id === productId)
    return product
  })
}

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

export { fetchProducts, getProductInCorrectOrder }
