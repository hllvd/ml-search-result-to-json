import {
  convertCatalogApiResponseToProductCatalogEntity,
  convertMLUserFromApiResponseToSellerEntity,
  convertProductApiResponseToProductCatalogEntity,
} from "../../convertors/ml.convert"
import dataSource from "../../db/data-source"
import { BrandModel } from "../../entities/sql/brand-model.entity"
import { CatalogFields } from "../../entities/sql/catalog-fields.entity"
import { ProductsCatalogs } from "../../entities/sql/products-catalogs.entity"
import { Seller } from "../../entities/sql/seller.entity"
import { EntityType } from "../../enums/entity-type.enum"
import { CatalogApiResponse } from "../../models/api-response/api/catalog-response.models"
import { ProductApiResponse } from "../../models/api-response/api/product-response.models"
import { MLProduct } from "../../models/dto/ml-product.models"

export const saveProductToDb = async (productInfo: ProductApiResponse) => {
  let product = new ProductsCatalogs()
  product = convertProductApiResponseToProductCatalogEntity(
    productInfo,
    EntityType.product
  )
  const { brand, model, color } = _getBrandModel(productInfo)
  product.brandModel = await _brandModelFieldHandler({ brand, model, color })

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
  catalog.brandModel = await _brandModelFieldHandler({ brand, model, color })

  const existingCatalog = await dataSource.manager
    .getRepository(ProductsCatalogs)
    .findOne({ where: { id: catalog?.id } })
  if (!existingCatalog.catalogFields) {
    const { catalogFields } = existingCatalog
    const catalogFieldDb = await dataSource.manager
      .getRepository(CatalogFields)
      .findOne({ where: { id: catalogFields?.id } })
    const catalogField = await _catalogFieldsHandler({
      catalogInfo,
      catalogFields: catalogFieldDb,
    })
    await dataSource.manager.save(catalogField)
  }

  await dataSource.manager.save(catalog)
  console.log("saved to db")
}

const _catalogFieldsHandler = async ({
  catalogFields,
  catalogInfo,
}: {
  catalogFields: CatalogFields
  catalogInfo: CatalogApiResponse
}) => {
  const {
    full = null,
    medalGold = null,
    medalLider = null,
    medalPlatinum = null,
  } = catalogInfo?.position || {}

  const {
    best = null,
    secondBest = null,
    full: priceFull = null,
    top5Avg = null,
  } = catalogInfo.price || {}
  catalogFields.length = catalogInfo?.length
  catalogFields.mlOwner = catalogInfo?.mlOwner
  catalogFields.positionFull = full
  catalogFields.positionMedalGold = medalGold
  catalogFields.positionMedalLider = medalLider
  catalogFields.positionMedalPlatinum = medalPlatinum

  catalogFields.priceBest = best
  catalogFields.priceFull = priceFull
  catalogFields.priceSecond = secondBest
  catalogFields.priceTop5Avg = top5Avg
  return catalogFields
}

const _brandModelFieldHandler = async ({
  brand,
  model,
  color,
}: {
  brand?: string
  model?: string
  color?: string
}) => {
  const existingBrandModel = await dataSource.manager
    .getRepository(BrandModel)
    .findOne({ where: { brand, model, color } })
  const brandModel = new BrandModel()
  if (!existingBrandModel) {
    console.log("new brand model created")
    brandModel.brand = brand
    brandModel.model = model
    brandModel.color = color
    await dataSource.manager.getRepository(BrandModel).save(brandModel)
  }
  return existingBrandModel || brandModel
}

const _getBrandModel = (
  product: MLProduct
): {
  model: string
  brand: string
  color: string
  detailed_model: string
} | null => {
  if (!product?.attributes) return null
  const attributeList = ["COLOR", "MODEL", "BRAND", "DETAILED_MODEL"]
  const selectedAttributes = product.attributes.filter((e) =>
    attributeList?.includes(e.id)
  )
  return selectedAttributes?.length > 0
    ? selectedAttributes.reduce((acc, e) => {
        acc[e.id.toLowerCase()] = e.value_name
        return acc
      }, {})
    : null
}
