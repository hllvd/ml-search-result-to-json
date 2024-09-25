import {
  catalogViewsResponseToViewsEntity,
  productViewsResponseToViewsEntity,
} from "../../convertors/ml/catalog-views.convertors"
import dataSource from "../../db/data-source"
import { ProductViews } from "../../entities/sql/views.entity"
import { CatalogVisitsApiResponse } from "../../models/api-response/api/catalog-visits-response.models"
import { ProductVisitsApiResponse } from "../../models/api-response/api/product-visits-response.models"

export const saveCatalogViewsDb = async (
  viewInfo: CatalogVisitsApiResponse
) => {
  const view = catalogViewsResponseToViewsEntity(viewInfo)
  dataSource
    .getRepository(ProductViews)
    .save(view)
    .then((_savedView) => {
      console.log("View saved successfully:")
    })
    .catch((error) => {
      console.error("Error saving view:", error.code)
    })
}

export const saveProductViewToDb = async (
  viewInfo: ProductVisitsApiResponse
) => {
  const view = productViewsResponseToViewsEntity(viewInfo)
  dataSource
    .getRepository(ProductViews)
    .save(view)
    .then((_savedView) => {
      console.log("View saved successfully:")
    })
    .catch((error) => {
      console.error("Error saving view:", error.code)
    })
}
