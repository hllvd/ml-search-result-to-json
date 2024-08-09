import { ProductId } from "aws-sdk/clients/sagemaker"
import { ScrapeType } from "../../enums/scrap-type.enum"
import { getProducts } from "./api/search.api.service"
import { getSeller } from "./api/users"
import { catalogReducer } from "./reducers/catalog.reducer.service"
import {
  webScrapeCatalogToMetadata,
  webScrapeCatalogToProductStrsPredicate,
} from "./scraper/predicate/catalog.predicate.service"
import { webScrapeMlPage } from "./scraper/web.scraper.service"

const catalogSummary = async ({
  catalogId,
  userId,
}): Promise<{ catalogReducerValues: object }> => {
  const productList: Array<ProductId> = await webScrapeMlPage(
    webScrapeCatalogToProductStrsPredicate,
    {
      catalogId,
      scrapeType: ScrapeType.CatalogProductList,
    }
  )
  const productMeta: Array<ProductId> = await webScrapeMlPage(
    webScrapeCatalogToMetadata,
    {
      catalogId,
      scrapeType: ScrapeType.CatalogMetadata,
    }
  )
  const catalog = await getProducts(userId, productList)
  const catalogSellers = await Promise.all(
    catalog.map(async (c): Promise<any> => {
      const mlUser = await getSeller({
        userId,
        sellerId: c.seller_id.toString(),
      })
      return { ...c, mlUser }
    })
  )

  const catalogReducerValues = catalogReducer(catalogSellers)

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
