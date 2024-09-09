import { ScrapeType } from "../../enums/scrap-type.enum"
import { MLProduct, ProductId } from "../../models/dto/ml-product.models"
import { FetchProductArgument } from "../../models/params/fetch-product.model"
import { fetchProduct, fetchProducts } from "./api/products.api.service"
import { fetchSeller } from "./api/users"
import { productIdsReducer } from "./reducers/product-urls.reducer.service"
import { webScrapeProductPricePredicate } from "./scraper/predicate/product/product-metadata.predicate.service"
import { webScrapeMlPage } from "./scraper/web.scraper.service"

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
  const productIdWIthDash = `MLB-${productId.split("MLB")[1]}`
  const product = await fetchProduct({ userId, productId })
  const sellerId = product?.seller_id?.toString()

  const [mlSeller, productPrice] = await Promise.all([
    fetchSeller({ sellerId, userId }),
    _wegScrapeProductSale(productIdWIthDash),
  ])
  return { ...product, mlSeller, price_promotional: productPrice }
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

const _wegScrapeProductSale = async (productId: string): Promise<any> => {
  const productPrice: Array<{ productIdStr: string; price: number }> =
    await webScrapeMlPage(webScrapeProductPricePredicate, {
      productId,
      scrapeType: ScrapeType.ProductPage,
    })
  return productPrice
}

export { getProducts, getProductInCorrectOrder, getProductWithItsSeller }
