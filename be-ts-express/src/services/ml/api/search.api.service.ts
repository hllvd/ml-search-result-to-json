import { MLProduct } from "../../../models/dto/ml-product.models"
import { fetchMl } from "../fetcher-api.ml.service"
import { getSeller } from "../api/users"

interface FetchProductArgument {
  userId: string
  productId: string
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

const _fetchProduct = async ({
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

const fetchProductItsSeller = async ({
  userId,
  productId,
}: FetchProductArgument) => {
  const product = await _fetchProduct({ userId, productId })
  const sellerId = product?.seller_id.toString()
  const mlSeller = await getSeller({ sellerId, userId })
  return { ...product, mlSeller }
}

export { fetchProducts, fetchProductItsSeller }
