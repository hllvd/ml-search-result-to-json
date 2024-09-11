import { ScrapeType } from "../../enums/scrap-type.enum"
import { CatalogResponse } from "../../models/api-response/catalog-response.models"
import { CatalogReducerResponse } from "../../models/reducers/catalog-reducer.models"
import { roundNumber } from "../../utils/math.util"
import { convertCatalogIdToProductId } from "../../utils/ml.utils"

import { fetchSeller } from "./api/users"
import { getProductInCorrectOrder, getProducts } from "./products.service"
import { catalogReducer } from "./reducers/catalog.reducer.service"
import { webScrapeCatalogToMetadataPredicate } from "./scraper/predicate/catalog/catalog-metadata.predicate.service"
import { webScrapeCatalogProductLengthPredicate } from "./scraper/predicate/catalog/catalog-product-lengths.predicate.service"
import { webScrapeCatalogToProductIdAndPricePredicate } from "./scraper/predicate/catalog/catalog-productIds-price.predicate.service"
import { webScrapeMlPage } from "./scraper/web.scraper.service"

const catalogSummary = async ({
  catalogId,
  userId,
}): Promise<CatalogResponse> => {
  const maxPage = 5
  const productList: Array<{ productIdStr: string; price: number }> =
    await webScrapeMlPage(webScrapeCatalogToProductIdAndPricePredicate, {
      catalogId,
      scrapeType: ScrapeType.CatalogProductList,
      maxPage,
    })
  const productSales = await webScrapeMlPage(
    webScrapeCatalogToMetadataPredicate,
    {
      catalogId,
      scrapeType: ScrapeType.CatalogMetadata,
    }
  )

  const amountOfProducts =
    productList.length === maxPage * 10
      ? await webScrapeMlPage(webScrapeCatalogProductLengthPredicate, {
          catalogId,
          scrapeType: ScrapeType.CatalogMetadata,
        })
      : productList.length

  console.log("amountOfProducts", amountOfProducts)
  const productListOnlyIds = productList.map((e) => e.productIdStr)
  const products = await getProducts(userId, productListOnlyIds)
  const productsWithSellers = await Promise.all(
    products.map(async (c): Promise<any> => {
      const user = await fetchSeller({
        userId,
        sellerId: c.seller_id.toString(),
      })

      return { ...c, user }
    })
  )

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

  return { catalogId, ...catalogReducerWithSummary }
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

  const catalogWithSummary = {
    ...options.catalog,
    revenue,
    dailyRevenue,
  }
  return catalogWithSummary
}

export { catalogSummary }
