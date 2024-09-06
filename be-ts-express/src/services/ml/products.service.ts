import { MLProduct, ProductId } from "../../models/dto/ml-product.models"
import { FetchProductArgument } from "../../models/params/fetch-product.model"
import { fetchProduct, fetchProducts } from "./api/search.api.service"
import { getSeller } from "./api/users"
import { productIdsReducer } from "./reducers/product-urls.reducer.service"

const getProducts = async (
  userId: string,
  productIds: ProductId[]
): Promise<MLProduct[]> => {
  const productIdMatrix = productIdsReducer(productIds)

  return (
    await Promise.all(
      productIdMatrix.map(async (productIds): Promise<MLProduct[]> => {
        const productIdStrs: string = productIds.join(", ")
        return await fetchProducts(userId, productIdStrs)
      })
    )
  ).flat(1)
}

const getProductWithItsSeller = async ({
  userId,
  productId,
}: FetchProductArgument) => {
  const product = await fetchProduct({ userId, productId })
  const sellerId = product?.seller_id?.toString()
  const mlSeller = await getSeller({ sellerId, userId })
  return { ...product, mlSeller }
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

export { getProducts, getProductInCorrectOrder, getProductWithItsSeller }
