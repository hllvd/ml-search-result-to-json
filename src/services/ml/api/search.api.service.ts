import { ProductId } from "aws-sdk/clients/sagemaker"
import { MLProduct } from "../../../models/dto/ml-product.models"
import { fetchMl } from "../fetcher-api.ml.service"
import { productIdsReducer } from "../reducers/product-urls.reducer.service"

const getProducts = async (
  userId: string,
  productIds: ProductId[]
): Promise<MLProduct[]> => {
  const productIdMatrix = productIdsReducer(productIds)

  return (
    await Promise.all(
      productIdMatrix.map(async (productIds): Promise<MLProduct[]> => {
        const productIdStrs: string = productIds.join(", ")
        return await _fetchProducts(userId, productIdStrs)
      })
    )
  ).flat(1)
}

const getProductInCorrectOrder = (
  productIds: ProductId[],
  products: MLProduct[]
): MLProduct[] => {
  return productIds.map((productId) => {
    const product = products.find((product) => product.id === productId)
    return product
  })
}

const _fetchProducts = async (
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

export { getProducts, getProductInCorrectOrder }
