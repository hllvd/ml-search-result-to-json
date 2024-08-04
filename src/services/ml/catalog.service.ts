import { ProductId } from "aws-sdk/clients/sagemaker"
import { ScrapeType } from "../../enums/scrap-type.enum"
import { MLProduct } from "../../models/dto/ml-product.models"
import { MLUser, PowerSellerStatus } from "../../models/dto/ml-user.models"
import { getProducts } from "./api/search.api.service"
import { getUser } from "./api/users"
import { userReducer } from "./reducers/user.reducer.service"
import { webScrapeCatalogToProductStrsPredicate } from "./scraper/predicate/catalog.predicate.service"
import { webScrapeMlPage } from "./scraper/web.scraper.service"

const catalogSummary = async ({
  productId,
  catalogId,
  userId,
}): Promise<any> => {
  const productList: Array<ProductId> = await webScrapeMlPage(
    webScrapeCatalogToProductStrsPredicate,
    {
      productId,
      catalogId,
      scrapeType: ScrapeType.Catalog,
    }
  )
  const catalog = await getProducts(userId, productList)
  const sellers = await Promise.all(
    catalog.map(async (c): Promise<MLUser> => {
      const user = await getUser({ userId, sellerId: c.seller_id.toString() })
      return user
    })
  )
  const sellerSum = userReducer(sellers)
  console.log(sellerSum)
  return catalog
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
