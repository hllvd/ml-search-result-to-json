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
import stateFieldPersistence from "./services/state-field.persistence"
import {
  StateFieldSubType,
  StateFieldType,
} from "../../enums/state-field-type.enum"

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
  console.log("saved saveProductToDb to db")
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
  const catalogStateFieldsConverted = await catalogStateFieldsConverter(
    catalogInfo
  )
  //catalogFieldConverted.length = 123
  // catalogFields.mlOwner = false
  // catalogFields.positionFull = 1

  catalog.stateFields =
    catalogStateFieldsConverted as unknown as Array<StateFields> /// TODO
  console.log("catalogFieldConverted", catalogFieldConverted)
  catalog.catalogFields = catalogFieldConverted

  await upsert(catalog, catalog.type)
  //await dataSource.manager.save(catalog)

  // await dataSource.manager.upsert(
  //   ProductsCatalogs,
  //   [catalog],
  //   ["catalogFields"]
  // )

  //await stateFieldsRepository(catalogFieldsConverted)
  console.log("save saveCatalogToDb to db")
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
    .leftJoinAndSelect("products.views", "views IS NOT NULL")
    .leftJoinAndSelect(
      "products.catalogFields",
      "catalogFields IS NOT NULL",
      "products.catalogFields IS NOT NULL"
    )
    .leftJoinAndSelect("products.stateFields", "StateFields")
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
      console.log("views", views)
      catalog.views = catalogInfo?.views
    } else {
      await viewsPersistence.link(catalogInfo.id)
    }

    /** HEEREEEEE */
    if (catalogInfo?.stateFields) {
      console.log("stateFields", catalogInfo?.stateFields)
      //await stateFieldPersistence.upsertStateFields(catalogInfo.stateFields)
      const stateFields = new StateFields()
      stateFields.type = StateFieldType.Medal
      stateFields.subType = StateFieldSubType.Coleta
      stateFields.state = "yyy"
      stateFields.value = 111
      stateFields.productCatalog = catalog.id

      const stateFields2 = new StateFields()
      stateFields2.type = StateFieldType.Medal
      stateFields2.subType = StateFieldSubType.Coleta
      stateFields2.state = "zzz"
      stateFields2.value = 222
      stateFields2.productCatalog = catalog.id

      catalog.stateFields = [stateFields, stateFields2]
    }

    if (catalogInfo?.catalogFields) {
      const cf = await catalogFieldsPersistence.upsert(
        catalogInfo.catalogFields
      )
      catalog.catalogFields = catalogInfo.catalogFields
    }

    catalog = catalogRepository.merge(catalog, {
      ...catalogInfo,
      type,
      title: catalogInfo.title,
      catalogFields,
      views,
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
