import { ProductsCatalogs } from "../../entities/sql/products-catalogs.entity"
import { ProductViews } from "../../entities/sql/views.entity"
import { EntityType } from "../../enums/entity-type.enum"
import { CatalogVisitsApiResponse } from "../../models/api-response/api/catalog-visits-response.models"
import { getEarliestAndLatestDate } from "../../utils/day-calculation.util"

export const viewsResponseToViewsEntity = (
  viewInfo: CatalogVisitsApiResponse
): ProductViews => {
  const { totalVisits, cv, catalogId, dates, dailyAvg } = viewInfo
  const { startDate, endDate } = getEarliestAndLatestDate(dates)
  const productsCatalogs = new ProductsCatalogs()
  productsCatalogs.id = catalogId
  productsCatalogs.type = EntityType.catalog
  const view = new ProductViews()
  view.cv = cv
  view.startDate = startDate
  view.endDate = endDate
  view.totalVisits = totalVisits
  view.productsCatalogs = productsCatalogs
  view.dailyAvg = dailyAvg
  return view
}
