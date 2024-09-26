import {
  catalogViewsResponseToViewsEntity,
  productViewsResponseToViewsEntity,
} from "../../convertors/ml/catalog-views.convertors"
import dataSource from "../../db/data-source"
import { ProductsCatalogs } from "../../entities/sql/products-catalogs.entity"
import { ProductViews } from "../../entities/sql/views.entity"
import { EntityType } from "../../enums/entity-type.enum"
import { CatalogVisitsApiResponse } from "../../models/api-response/api/catalog-visits-response.models"
import { ProductVisitsApiResponse } from "../../models/api-response/api/product-visits-response.models"

export const saveCatalogViewsDb = async (
  viewInfo: CatalogVisitsApiResponse
) => {
  const view = catalogViewsResponseToViewsEntity(viewInfo)
  try {
    await dataSource.manager.upsert(ProductViews, [view], ["id"])
  } catch (e) {
    if (e.code === "ER_NO_REFERENCED_ROW_2") {
      await dataSource.manager.upsert(ProductViews, [view], ["id"])
      const { catalogId } = viewInfo
      _createProductCatalogRegister({ catalogId })
    }
  }
}

export const saveProductViewToDb = async (
  viewInfo: ProductVisitsApiResponse
) => {
  const view = productViewsResponseToViewsEntity(viewInfo)
  try {
    await dataSource.manager.upsert(ProductViews, [view], ["id"])
  } catch (e) {
    if (e.code === "ER_NO_REFERENCED_ROW_2") {
      await dataSource.manager.upsert(ProductViews, [view], ["id"])
      const { productId } = viewInfo
      _createProductCatalogRegister({ productId })
    }
  }
}

const _createProductCatalogRegister = async ({
  productId,
  catalogId,
}: {
  productId?: string
  catalogId?: string
}) => {
  const type = productId == null ? EntityType.catalog : EntityType.product
  const productsCatalogs = new ProductsCatalogs()
  productsCatalogs.id = productId || catalogId
  productsCatalogs.type = type
  await dataSource.manager.save(productsCatalogs)
}
