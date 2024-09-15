import {
  convertMLUserFromApiResponseToSellerEntity,
  convertProductApiResponseToProductCatalogEntity,
} from "../convertors/ml.convert"
import dataSource from "../db/data-source"
import { ProductsCatalogs } from "../entities/sql/products-catalogs.entity"
import { Seller } from "../entities/sql/seller.entity"
import { RequestExtended } from "../models/extends/params/request-custom.model"

const persistentMiddleware = async (req: RequestExtended) => {
  const { productInfo } = req.persistency
  const { user } = productInfo

  let seller = new Seller()
  const existingUser = await dataSource.manager
    .getRepository(Seller)
    .findOne({ where: { id: user.id } })

  if (!existingUser) {
    seller = convertMLUserFromApiResponseToSellerEntity(user)
    await dataSource.manager.getRepository(Seller).save(seller)
  }

  let product = new ProductsCatalogs()
  const prod = convertProductApiResponseToProductCatalogEntity(productInfo)
  product = prod
  product.seller = existingUser || seller

  await dataSource.manager.save(product)
  console.log("saved to db")
}

export { persistentMiddleware }
