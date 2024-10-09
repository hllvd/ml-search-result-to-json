import { MLProduct } from "../../models/dto/ml-product.models"
import { fetchSeller } from "./api/users"

const getProductSellers = async ({
  products,
  userId,
}: {
  products: Array<MLProduct>
  userId: string
}): Promise<MLProduct[]> => {
  const productsWithSellers = await Promise.all(
    products.map(async (c): Promise<any> => {
      const user = await _getSeller({
        userId,
        sellerId: c.seller_id.toString(),
      })
      return { ...c, user }
    })
  )
  return productsWithSellers
}

/**
 *
 * Try to get the category info from the cache/db, if not found, fetch it from the API
 * @param products
 * @param userId
 * @returns
 */
const getProductSellersPersistent = async ({
  products,
  userId,
}: {
  products: Array<MLProduct>
  userId: string
}): Promise<void> => {
  return
}

const _getSeller = async ({
  userId,
  sellerId,
}: {
  userId: string
  sellerId: string
}) => await fetchSeller({ userId, sellerId })

export { getProductSellers }
