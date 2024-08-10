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
  const productMeta = await webScrapeMlPage(
    webScrapeCatalogToMetadataPredicate,
    {
      catalogId,
      scrapeType: ScrapeType.CatalogMetadata,
    }
  )

  console.log("productMeta", productMeta)
  const productListOnlyIds = productList.map((e) => e.productIdStr)
  const products = await getProducts(userId, productListOnlyIds)
  const productsWithSellers = await Promise.all(
    products.map(async (c): Promise<any> => {
      const mlUser = await getSeller({
        userId,
        sellerId: c.seller_id.toString(),
      })
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

  const catalogReducerValues = catalogReducer(
    productsWithSellersAndPricesInCorrectOrder
  )

  return { catalogReducerValues }
}

//   const catalogReducer = catalog.reduce(
//     (acc, curr) => {
//       acc.price += curr.price
//       return acc
//     },
//     {
//       shipmentFull: 0,
//       shipmentColeta: 0,
//       price: 0,
//     }
//   )

//   return { catalogReducer, sellerReducer }
// }

export { catalogSummary }
