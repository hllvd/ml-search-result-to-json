import {
  catalogInfoToCatalogFieldsEntityConverter,
  convertCatalogApiResponseToProductCatalogEntity,
  convertMLUserFromApiResponseToSellerEntity,
  convertProductApiResponseToProductCatalogEntity,
} from "../../converters/ml.convert"
import { catalogStateFieldsConverter } from "../../converters/ml/state-info.converter"
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
import { BrandModel } from "../../entities/sql/brand-model.entity"
import { StateFields } from "../../entities/sql/state-fields.entity"
import { ProductViewsSummary } from "../../entities/sql/views-summary.entity"
import brandsPersistence from "./services/brands.persistence"
import catalogFieldsPersistence from "./services/catalog-fields.persistence"
import sellerPersistence from "./services/seller.persistence"
import viewsPersistence from "./services/views.persistence"

export const saveProductToDb = async (productInfo: ProductApiResponse) => {
  let product = new ProductsCatalogs()
  product = convertProductApiResponseToProductCatalogEntity(
    productInfo,
    EntityType.Product
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
    //await dataSource.manager.getRepository(Seller).save(seller)
  }

  product.seller = existingUser || seller
  //await dataSource.manager.save(product)
  await upsert(product, product.type)
  console.log("saved to db")
}

export const saveCatalogToDb = async (catalogInfo: CatalogApiResponse) => {
  let catalog = new ProductsCatalogs()
  catalog = convertCatalogApiResponseToProductCatalogEntity(
    catalogInfo,
    EntityType.Catalog
  )
  const { brand, model, color } = catalogInfo?.brandModel
  catalog.brandModel = await brandModelFieldHandler({ brand, model, color })

  const catalogFields = new CatalogFields()

  const catalogFieldConverted = await catalogInfoToCatalogFieldsEntityConverter(
    {
      catalogInfo,
      catalogFields,
    }
  )
  //catalogFieldConverted.length = 123
  // catalogFields.mlOwner = false
  // catalogFields.positionFull = 1
  console.log("catalogFieldConverted", catalogFieldConverted)
  catalog.catalogFields = catalogFieldConverted

  await upsert(catalog, catalog.type)
  //await dataSource.manager.save(catalog)

  // await dataSource.manager.upsert(
  //   ProductsCatalogs,
  //   [catalog],
  //   ["catalogFields"]
  // )

  const catalogFieldsConverted = await catalogStateFieldsConverter(catalogInfo)
  //await stateFieldsRepository(catalogFieldsConverted)
}

enum OrderBy {
  Created = "created",
  Views = "views",
  dailyRevenue = "dailyRevenue",
}
interface ProductListQueries {
  userId?: string
  orderBy?: OrderBy
  limit?: number
}
const list = async (productListQueries?: ProductListQueries): Promise<any> => {
  const { userId, orderBy, limit } = productListQueries
  // const productListDb = await dataSource.manager.getRepository(ProductsCatalogs)
  const productListDb = await dataSource.manager
    .getRepository(ProductsCatalogs)
    .createQueryBuilder("products")

  const productList = await productListDb.getMany()
  return [...productList]
}

const get = async (productId): Promise<ProductsCatalogs> => {
  const productsCatalogs = await dataSource.manager
    .getRepository(ProductsCatalogs)
    .createQueryBuilder("products")
    .leftJoinAndSelect("products.brandModel", "brandModel IS NOT NULL")
    .leftJoinAndSelect("products.seller", "seller IS NOT NULL")
    //.leftJoinAndSelect("products.views", "views IS NOT NULL")
    .leftJoinAndSelect("products.stateFields", "stateFields IS NOT NULL")
    //.leftJoinAndSelect("products.catalogFields", "catalogFields IS NOT NULL")
    .where("products.id = :productId", { productId })
    .getOne()
  return productsCatalogs
}

const upsert = async (
  catalogInfo: ProductsCatalogs,
  type: EntityType,
  {
    catalogFields,
    brandModel,
    views,
    stateFields,
  }: {
    catalogFields?: CatalogFields
    brandModel?: BrandModel
    views?: ProductViewsSummary
    stateFields?: StateFields
  } = {}
) => {
  try {
    const catalogRepository = dataSource.getRepository(ProductsCatalogs)

    // Create or get existing catalog
    let catalog = await catalogRepository.findOne({
      where: { id: catalogInfo.id },
      relations: ["catalogFields", "brandModel"],
    })

    if (!catalog) {
      catalog = new ProductsCatalogs()
      catalog.id = catalogInfo.id
    }

    if (catalogInfo?.brandModel) {
      const brandModel = await brandsPersistence.findOrInsert(
        catalogInfo.brandModel
      )
      catalog.brandModel = brandModel
    }

    if (catalogInfo?.seller) {
      const seller = await sellerPersistence.upsert(catalogInfo.seller)
      catalog.seller = seller
    }

    if (catalogInfo?.views) {
      const views = await viewsPersistence.upsert(catalogInfo.views)
      //catalog.views = views
    }

    if (catalogInfo?.catalogFields) {
      const views = await catalogFieldsPersistence.upsert(
        catalogInfo.catalogFields
      )
      //catalog.catalogFields = catalogFields
    }

    catalog = catalogRepository.merge(catalog, {
      ...catalogInfo,
      type,
      title: catalogInfo.title,
      catalogFields,
      views,
      stateFields,
      brandModel,
    })

    const result = await dataSource.manager.upsert(
      ProductsCatalogs,
      [catalog],
      ["catalogFields"]
    )
    return result
  } catch (error) {
    console.error("Error in upsert operation:", error)
    throw error
  }
}

export default { list, get, upsert }
