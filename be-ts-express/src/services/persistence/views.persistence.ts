import {
  catalogViewsResponseToViewsEntity,
  productViewsResponseToViewsEntity,
} from "../../converters/ml/catalog-views.converters"
import dataSource from "../../db/data-source"
import { ProductsCatalogs } from "../../entities/sql/products-catalogs.entity"
import { ProductViewsSummary } from "../../entities/sql/views-summary.entity"
import { EntityType } from "../../enums/entity-type.enum"
import { CatalogVisitsApiResponse } from "../../models/api-response/api/catalog-visits-response.models"
import { ProductVisitsApiResponse } from "../../models/api-response/api/product-visits-response.models"

export const saveCatalogViewsDb = async (
  viewInfo: CatalogVisitsApiResponse
) => {
  const view = catalogViewsResponseToViewsEntity(viewInfo)
  try {
    await dataSource.manager.upsert(ProductViewsSummary, [view], ["id"])
  } catch (e) {
    console.log("err")
    if (e.code === "ER_NO_REFERENCED_ROW_2" || e.code === "ER_DUP_ENTRY") {
      const { catalogId } = viewInfo
      await _createProductCatalogRegister({
        catalogId,
        type: EntityType.Catalog,
      })
      await dataSource.manager.upsert(
        ProductViewsSummary,
        [view],
        ["productsCatalogs"]
      )
    }
  }
}

export const saveProductViewToDb = async (
  viewInfo: ProductVisitsApiResponse
) => {
  const view = productViewsResponseToViewsEntity(viewInfo)
  console.log("saveProductViewToDb", view)
  try {
    await dataSource.manager.upsert(ProductViewsSummary, [view], ["id"])
  } catch (e) {
    if (e.code === "ER_NO_REFERENCED_ROW_2") {
      const { productId } = viewInfo
      await _createProductCatalogRegister({
        productId,
        type: EntityType.Product,
      })
      await dataSource.manager.upsert(
        ProductViewsSummary,
        [view],
        ["productsCatalogs"]
      )
    }
  }
}

const _createProductCatalogRegister = async ({
  productId,
  catalogId,
  type,
}: {
  productId?: string
  catalogId?: string
  type: EntityType
}) => {
  const productsCatalogs = new ProductsCatalogs()
  productsCatalogs.id = productId || catalogId
  productsCatalogs.type = type
  await dataSource.manager.save(productsCatalogs)
}
