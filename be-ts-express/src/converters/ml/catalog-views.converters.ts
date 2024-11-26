import { ProductsCatalogs } from "../../entities/sql/products-catalogs.entity"
import { ProductViewsSummary } from "../../entities/sql/views.entity"

import { EntityType } from "../../enums/entity-type.enum"
import { CatalogVisitsApiResponse } from "../../models/api-response/api/catalog-visits-response.models"
import { ProductVisitsApiResponse } from "../../models/api-response/api/product-visits-response.models"
import { getEarliestAndLatestDate } from "../../utils/day-calculation.util"

export const catalogViewsResponseToViewsEntity = (
  viewInfo: CatalogVisitsApiResponse
): ProductViewsSummary => {
  const { totalVisits, cv, catalogId, dates, dailyAvg } = viewInfo
  const { startDate, endDate } = getEarliestAndLatestDate(dates)
  const productsCatalogs = new ProductsCatalogs()
  productsCatalogs.id = catalogId
  productsCatalogs.type = EntityType.Catalog
  const view = new ProductViewsSummary()
  view.cv = cv
  view.startDate = startDate
  view.endDate = endDate
  view.totalVisits = totalVisits
  view.productsCatalogs = catalogId
  view.dailyAvg = dailyAvg
  return view
}

export const productViewsResponseToViewsEntity = (
  viewInfo: ProductVisitsApiResponse
): ProductViewsSummary => {
  const { totalVisits, productId, dates, dailyAvg } = viewInfo
  const { startDate, endDate } = getEarliestAndLatestDate(dates)
  const productsCatalogs = new ProductsCatalogs()
  productsCatalogs.id = productId
  productsCatalogs.type = EntityType.Product
  const view = new ProductViewsSummary()
  view.startDate = startDate
  view.endDate = endDate
  view.totalVisits = totalVisits
  view.productsCatalogs = productId
  view.dailyAvg = dailyAvg
  return view
}
