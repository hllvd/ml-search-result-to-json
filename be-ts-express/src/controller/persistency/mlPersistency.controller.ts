import { NextFunction, Response } from "express"
import { catalogInfoToCatalogFieldsEntityConverter } from "../../converters/ml.convert"
import dataSource from "../../db/data-source"
import { BrandModel } from "../../entities/sql/brand-model.entity"
import { CatalogFields } from "../../entities/sql/catalog-fields.entity"
import { ProductsCatalogs } from "../../entities/sql/products-catalogs.entity"
import { Seller } from "../../entities/sql/seller.entity"
import { StateFields } from "../../entities/sql/state-fields.entity"
import { ProductViewsSummary } from "../../entities/sql/views-summary.entity"
import { EntityType } from "../../enums/entity-type.enum"
import { RequestExtended } from "../../models/extends/params/request-custom.model"
import persistencyService from "../../services/persistence/product-catalog.persistence"

const items = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction
) => {
  //const userId = req.query?.userId?.toString() ?? "1231084821"
  //const productListFromDb = await persistencyService.listProduct({ userId })
  //res.status(200).json({ ...productListFromDb })
  let catalog = new ProductsCatalogs()
  catalog.type = EntityType.Catalog
  catalog.id = "test5"
  catalog.title = "title2frtert"

  const catalogFields = new CatalogFields()
  catalog.catalogFields = catalogFields
  catalogFields.priceBest = 222

  // const seller = new Seller()
  // seller.id = 6777
  // seller.nickname = "nickname 6777"
  // catalog.seller = seller

  // const brand = new BrandModel()
  // brand.color = "RED"
  // brand.model = "model 7"
  // brand.brand = "brand 7"
  // catalog.brandModel = brand

  const summaryViews = new ProductViewsSummary()
  summaryViews.cv = 12
  summaryViews.dailyAvg = 15
  summaryViews.id = catalog.id
  summaryViews.totalVisits = 123
  summaryViews.startDate = "2024-02-02"
  summaryViews.endDate = "2024-02-02"
  catalog.views = { ...summaryViews }

  await upsertProductCatalog(catalog, EntityType.Catalog)
  res.status(200).json({ ...catalog })
  //res.status(200).json({})
}

const insertProductViews = async (viewsInfo: ProductViewsSummary) => {
  const viewsRepository = dataSource.getRepository(ProductViewsSummary)
  let views = await viewsRepository.findOne({
    where: { id: viewsInfo.id },
  })
  if (!views) {
    views = new ProductViewsSummary()
    views = { ...viewsInfo }
  }
  return await dataSource.manager.getRepository(ProductViewsSummary).save(views)
}

const upsertProductCatalog = async (
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
      const brandModel = await findOrInsertBrandModel(catalogInfo.brandModel)
      catalog.brandModel = brandModel
    }

    if (catalogInfo?.seller) {
      const seller = await upsertSeller(catalogInfo.seller)
      catalog.seller = seller
    }

    if (catalogInfo?.views) {
      const views = await insertProductViews(catalogInfo.views)
      catalog.views = views
    }

    catalog = catalogRepository.merge(catalog, {
      ...catalogInfo,
      type,
      title: catalogInfo.title,
      // catalogFields,
      // views,
      // stateFields,
    })

    // Save will perform insert or update as needed
    const result = await catalogRepository.save(catalog)
    return result
  } catch (error) {
    console.error("Error in upsert operation:", error)
    throw error
  }
}

export const findOrInsertBrandModel = async ({
  brand,
  model,
  color,
}: BrandModel): Promise<BrandModel> => {
  const existingBrandModel = await dataSource.manager
    .getRepository(BrandModel)
    .findOne({ where: { brand, model, color } })

  if (existingBrandModel) {
    return existingBrandModel
  }

  const newBrandModel = new BrandModel()
  newBrandModel.brand = brand
  newBrandModel.model = model
  newBrandModel.color = color
  return await dataSource.manager.getRepository(BrandModel).save(newBrandModel)
}

export const upsertSeller = async (seller: Seller): Promise<Seller> => {
  return await dataSource.manager.getRepository(Seller).save(seller)
}

export default { items }
