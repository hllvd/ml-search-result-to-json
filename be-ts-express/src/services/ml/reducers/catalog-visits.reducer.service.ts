import algebra from "../../../utils/algebra"
import { ProductVisitsResponse } from "../../../models/api-response/product-views-response.models"

interface CatalogVisitsReducerResponse {
  dates: { [key: string]: number }
  totalVisits: number
  dailyAvg: number
}
const catalogVisitsReducer = (
  visits: Array<ProductVisitsResponse>
): CatalogVisitsReducerResponse => {
  const catalogVisitsReducer = visits.reduce(
    (acc, curr, i) => {
      curr.results.forEach((e) => {
        const date = new Date(e.date).toISOString().slice(0, 10)
        acc.dates[date] = (acc.dates[date] || 0) + e.total
        acc.totalVisits = acc.totalVisits + e.total
      })
      return acc
    },
    {
      dates: {},
      dailyAvg: 0,
      totalVisits: 0,
    }
  )
  const datesArray = Object.entries(catalogVisitsReducer.dates)
  const daysAmount = datesArray.length || 1

  catalogVisitsReducer.dailyAvg = catalogVisitsReducer.totalVisits / daysAmount

  return catalogVisitsReducer
}

export { catalogVisitsReducer }
