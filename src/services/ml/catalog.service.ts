import { ML_OWN_USER_ID } from "../../constants"
import { ScrapeType } from "../../enums/scrap-type.enum"
import { getProductInCorrectOrder, getProducts } from "./api/search.api.service"
import { getSeller } from "./api/users"
import { catalogReducer } from "./reducers/catalog.reducer.service"
import { webScrapeCatalogToMetadataPredicate } from "./scraper/predicate/catalog/catalog-metadata.predicate.service"
import { webScrapeCatalogToProductIdAndPricePredicate } from "./scraper/predicate/catalog/catalog-producIds-price.predicate.service"
import { webScrapeMlPage } from "./scraper/web.scraper.service"

const catalogSummary = async ({
  catalogId,
  userId,
}): Promise<{ catalogReducerValues: object }> => {
  const productList: Array<{ productIdStr: string; price: number }> =
    await webScrapeMlPage(webScrapeCatalogToProductIdAndPricePredicate, {
      catalogId,
      scrapeType: ScrapeType.CatalogProductList,
    })
  const productSales = await webScrapeMlPage(
    webScrapeCatalogToMetadataPredicate,
    {
      catalogId,
      scrapeType: ScrapeType.CatalogMetadata,
    }
  )

  const productListOnlyIds = productList.map((e) => e.productIdStr)
  const products = await getProducts(userId, productListOnlyIds)
  const productsWithSellers = await Promise.all(
    products.map(async (c): Promise<any> => {
      const mlUser = await getSeller({
        userId,
        sellerId: c.seller_id.toString(),
      })
      if (c.seller_id.toString() == ML_OWN_USER_ID) {
        return { ...c, mlUser, mlOwner: true }
      }
      return { ...c, mlUser }
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

  const catalogRecuderWithSummary = _summarizeCatalog({
    catalog: catalogReducerValues,
    sales: productSales,
  })

  return { catalogReducerValues: catalogRecuderWithSummary }
}

const _summarizeCatalog = (options: {
  catalog: CatalogReducerResponse
  sales: number
}) => {
  const revenue = options.sales * options.catalog.firstPlacePrice

  const dateCreated = new Date(options?.catalog?.dateCreated) ?? null
  const today = new Date()
  const timeDiff = today.getTime() - dateCreated.getTime()
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
  const dailyRevenue = revenue / daysDiff

  const catalogWithSummary = {
    ...options.catalog,
    revenue,
    dailyRevenue,
  }
  return catalogWithSummary
}

export { catalogSummary }
