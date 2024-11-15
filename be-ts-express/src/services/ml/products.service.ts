import { ScrapeType } from "../../enums/scrap-type.enum"
import { MLProduct, ProductId } from "../../models/dto/ml-product.models"
import { FetchProductArgument } from "../../models/params/fetch-product.model"
import { calculateDaysFrom } from "../../utils/day-claculation.util"
import { roundNumber } from "../../utils/math.util"
import {
  convertCatalogIdToProductId,
  getEanIfExist,
} from "../../utils/ml.utils"
import { fetchProduct, fetchProducts } from "./api/products.api.service"
import { fetchSeller } from "./api/users"
import { productIdsReducer } from "./reducers/product-urls.reducer.service"
import { webScrapeProductPriceAndQuantitySoldPredicate } from "./scraper/predicate/product/product-metadata.predicate.service"
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

const getProductComplete = async ({
  userId,
  productId,
}: FetchProductArgument) => {
  const productIdWIthDash = convertCatalogIdToProductId(productId)
  const product = await fetchProduct({ userId, productId })
  const sellerId = product?.seller_id?.toString()

  const [user, scrapProductPage] = await Promise.all([
    fetchSeller({ sellerId, userId }),
    _webScrapeProductPriceAndQuantitySold(productIdWIthDash),
  ])
  const extraFields = _getProductStatistics({
    product,
    currentPrice: scrapProductPage.currentPrice,
    quantitySold: scrapProductPage.quantitySold,
  })

  return {
    ...product,
    user,
    ...extraFields,
  }
}

const _getProductStatistics = ({
  product,
  currentPrice,
  quantitySold,
}: {
  product: MLProduct
  currentPrice: number
  quantitySold: number
}): MLProduct => {
  const fixedCommissionPrice = 0.12
  const fixedShipmentPrice = 22
  const maxPriceWithoutShipmentCommission = 79

  const revenue = currentPrice * quantitySold
  const days = calculateDaysFrom(product.date_created)
  const ean = getEanIfExist(product.attributes)

  const shipmentCommission =
    currentPrice > maxPriceWithoutShipmentCommission ? fixedShipmentPrice : 0
  const percentageCommission = fixedCommissionPrice * currentPrice
  const totalCommission = shipmentCommission + shipmentCommission
  const grossProfit = currentPrice - totalCommission

  const commissions = {
    fixedCommissionPrice,
    fixedShipmentPrice,
    shipmentCommission,
    percentageCommission,
    totalCommission,
    grossProfit,
  }

  const daily_revenue = roundNumber(revenue / days)
  const has_promotion =
    currentPrice < product.price || product.price < product.original_price
  return {
    ...product,
    ean,
    has_promotion,
    revenue,
    quantity_sold: quantitySold,
    current_price: currentPrice,
    daily_revenue,
    commissions,
  }
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

const _webScrapeProductPriceAndQuantitySold = async (
  productId: string
): Promise<any> => {
  const productPrice: Array<{ productIdStr: string; price: number }> =
    await webScrapeMlPage(webScrapeProductPriceAndQuantitySoldPredicate, {
      productId,
      scrapeType: ScrapeType.ProductPage,
    })
  return productPrice
}

export { getProducts, getProductInCorrectOrder, getProductComplete }
