import { ScrapeType } from "../../enums/scrap-type.enum"
import { ProductApiResponse } from "../../models/api-response/api/product-response.models"
import { MlProductExtraFields } from "../../models/dto/ml-product-extra-fields.models"
import { MLProduct, ProductId } from "../../models/dto/ml-product.models"
import { FetchProductArgument } from "../../models/params/fetch-product.model"
import { calculateDaysFrom } from "../../utils/day-calculation.util"
import { roundNumber } from "../../utils/math.util"
import { convertCatalogIdToProductId } from "../../utils/ml.utils"
import { fetchProduct, fetchProducts } from "./api/products.api.service"
import { fetchSeller } from "./api/users"
import { productIdsReducer } from "./reducers/product-urls.reducer.service"
import { webScrapeProductPriceAndQuantitySoldAndHasVideoPredicate } from "./scraper/predicate/product/product-metadata.predicate.service"
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
}: FetchProductArgument): Promise<ProductApiResponse> => {
  const productIdWIthDash = convertCatalogIdToProductId(productId)
  const product = await fetchProduct({ userId, productId })
  const sellerId = product?.seller_id?.toString()

  const [user, scrapProductPage] = await Promise.all([
    fetchSeller({ sellerId, userId }),
    _webScrapeProductMetadata(productIdWIthDash),
  ])

  const extraFields = _getProductExtraFields({
    product,
    currentPrice: scrapProductPage?.currentPrice,
    quantitySold: scrapProductPage?.quantitySold,
  })

  const ean = _getEanFromProductObj(product)
  extraFields.ean = ean
  extraFields.has_video = scrapProductPage.hasVideo
  extraFields.picture_count = product.pictures.length
  extraFields.supermarket_eligible = product.tags.includes(
    "supermarket_eligible"
  )

  return {
    productId,
    ...product,
    user,
    ...extraFields,
  }
}

const _getEanFromProductObj = (product: MLProduct): string | null => {
  try {
    return product.attributes
      .find((a) => a.id === "GTIN")
      .value_name?.toString()
  } catch (e) {
    return null
  }
}

const _getProductExtraFields = ({
  product,
  currentPrice,
  quantitySold,
}: {
  product: MLProduct
  currentPrice: number
  quantitySold: number
}): MlProductExtraFields => {
  quantitySold = quantitySold ?? 1
  const revenue = currentPrice * quantitySold
  const days = calculateDaysFrom(product.date_created)
  const daily_revenue = roundNumber(revenue / days)
  const has_promotion =
    currentPrice < product.price || product.price < product.original_price
  return {
    ...product,
    has_promotion,
    revenue,
    quantity_sold: quantitySold,
    current_price: currentPrice,
    daily_revenue,
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

const _webScrapeProductMetadata = async (productId: string): Promise<any> => {
  const productPrice: Array<{ productIdStr: string; price: number }> =
    await webScrapeMlPage(
      webScrapeProductPriceAndQuantitySoldAndHasVideoPredicate,
      {
        productId,
        scrapeType: ScrapeType.ProductPage,
      }
    )
  return productPrice
}

export { getProducts, getProductInCorrectOrder, getProductComplete }
