import {
  catalogInfoToCatalogFieldsEntityConverter,
  convertCatalogApiResponseToProductCatalogEntity,
  convertMLUserFromApiResponseToSellerEntity,
  convertProductApiResponseToProductCatalogEntity,
} from "../../convertors/ml.convert"
import dataSource from "../../db/data-source"
import { CatalogFields } from "../../entities/sql/catalog-fields.entity"
import { ProductsCatalogs } from "../../entities/sql/products-catalogs.entity"
import { Seller } from "../../entities/sql/seller.entity"
import { EntityType } from "../../enums/entity-type.enum"
import { CatalogApiResponse } from "../../models/api-response/api/catalog-response.models"
import { ProductApiResponse } from "../../models/api-response/api/product-response.models"
import {
  brandModelFieldHandler,
  getBrandModel,
} from "./services/brands.persistence"

export const saveProductToDb = async (productInfo: ProductApiResponse) => {
  let product = new ProductsCatalogs()
  product = convertProductApiResponseToProductCatalogEntity(
    productInfo,
    EntityType.product
  )
  const { brand, model, color } = getBrandModel(productInfo)
  product.brandModel = await brandModelFieldHandler({ brand, model, color })

  const { user } = productInfo
  let seller = new Seller()
  const existingUser = await dataSource.manager
    .getRepository(Seller)
    .findOne({ where: { id: user.id } })

  if (!existingUser) {
    seller = convertMLUserFromApiResponseToSellerEntity(user)
    await dataSource.manager.getRepository(Seller).save(seller)
  }

  product.seller = existingUser || seller
  await dataSource.manager.save(product)
  console.log("saved to db")
}

export const saveCatalogToDb = async (catalogInfo: CatalogApiResponse) => {
  let catalog = new ProductsCatalogs()
  catalog = convertCatalogApiResponseToProductCatalogEntity(
    catalogInfo,
    EntityType.catalog
  )
  const { brand, model, color } = catalogInfo?.brandModel
  catalog.brandModel = await brandModelFieldHandler({ brand, model, color })

  const existingCatalog = await dataSource.manager
    .getRepository(ProductsCatalogs)
    .findOne({ where: { id: catalog?.id } })

  const { catalogFields = new CatalogFields() } = existingCatalog
  console.log("catalogFieldDb", catalogFields)

  const catalogField = await catalogInfoToCatalogFieldsEntityConverter({
    catalogInfo,
    catalogFields: catalogFields,
  })
  console.log("catalogField", catalogField)

  await dataSource.manager.save(catalogField)

  await dataSource.manager.save(catalog)
  console.log("saved to db")
}
