import { ScrapeType } from "../../enums/scrap-type.enum"
import { CatalogApiResponse } from "../../models/api-response/api/catalog-response.models"
import { CatalogReducerResponse } from "../../models/reducers/catalog-reducer.models"
import { roundNumber } from "../../utils/math.util"
import { getPersistentCategoryInfo } from "./categories.service"

import {
  calculateCommissions,
  getProductInCorrectOrder,
  getProducts,
} from "./products.service"
import { catalogReducer } from "./reducers/catalog.reducer.service"
import { webScrapeCatalogToMetadataPredicate } from "./scraper/predicate/catalog/catalog-metadata.predicate.service"
import { webScrapeCatalogProductLengthPredicate } from "./scraper/predicate/catalog/catalog-product-lengths.predicate.service"
import { webScrapeCatalogToProductIdAndPricePredicate } from "./scraper/predicate/catalog/catalog-productIds-price.predicate.service"
import { webScrapeMlPage } from "./scraper/web.scraper.service"
import { getProductSellers } from "./seller.service"

const catalogSummary = async ({
  catalogId,
  userId,
}): Promise<CatalogApiResponse> => {
  const maxPage = 5
  const { result: productList } = await webScrapeMlPage(
    webScrapeCatalogToProductIdAndPricePredicate,
    {
      catalogId,
      scrapeType: ScrapeType.CatalogProductList,
      maxPage,
    }
  )

  const { result: productMetadata } = await (<
    Promise<{ result: { hasVideo: boolean; amountInt: any } }>
  >webScrapeMlPage(webScrapeCatalogToMetadataPredicate, {
    catalogId,
    scrapeType: ScrapeType.CatalogMetadata,
  }))
  const { hasVideo: hasVideoInProductMetadata, amountInt: productSales } =
    productMetadata

  const { result: productLength } = await webScrapeMlPage(
    webScrapeCatalogProductLengthPredicate,
    {
      catalogId,
      scrapeType: ScrapeType.CatalogProductList,
    }
  )

  const amountOfProducts = productLength

  console.log("hasVideoInProductMetadata", hasVideoInProductMetadata)
  console.log("productList", productList)
  console.log("productSales", productSales)
  console.log("productLength", productLength)
  console.log("amountOfProducts", amountOfProducts)
  const productListOnlyIds = productList.map((e) => e.productIdStr)
  const products = await getProducts(userId, productListOnlyIds)
  const productsWithSellers = await getProductSellers({ userId, products })

  const productsWithSellersInCorrectOrder = getProductInCorrectOrder(
    productListOnlyIds,
    productsWithSellers
  )

  const productsWithSellersAndPricesInCorrectOrder =
    productsWithSellersInCorrectOrder.map((p, i) => ({
      ...p,
      price: productList[i].price,
    }))

  const productsWithSellersPricesAndAmountInCorrectOrder =
    productsWithSellersAndPricesInCorrectOrder.map((p) => ({
      ...p,
    }))

  const catalogReducerValues = catalogReducer(
    productsWithSellersPricesAndAmountInCorrectOrder
  )

  const catalogReducerWithSummary = _summarizeCatalog({
    catalog: { ...catalogReducerValues, length: amountOfProducts },
    sales: productSales,
  })
  const { has_video: hasVideo } = productSales

  const categoryId = products[0]?.category_id ?? null

  // if (categoryId) {
  //   const category = await getPersistentCategoryInfo({ userId, categoryId })
  //   return { catalogId, ...catalogReducerWithSummary, hasVideo, category }
  // }

  return {
    catalogId,
    ...catalogReducerWithSummary,
    hasVideo: hasVideoInProductMetadata,
  }
}

const _summarizeCatalog = (options: {
  catalog: CatalogReducerResponse
  sales: number
}) => {
  const revenue = options.sales * options?.catalog?.price?.best

  const dateCreated = new Date(options?.catalog?.dateCreated) ?? null
  const today = new Date()
  const timeDiff = today.getTime() - dateCreated.getTime()
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
  const dailyRevenue = roundNumber(revenue / daysDiff)
  const commissions = calculateCommissions(options?.catalog?.price?.best)

  const catalogWithSummary = {
    ...options.catalog,
    revenue,
    dailyRevenue,
    quantitySold: options.sales,
    commissions,
  }
  return catalogWithSummary
}

export { catalogSummary }
