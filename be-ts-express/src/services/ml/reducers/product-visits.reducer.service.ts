import { ProductVisitsMlResponse } from "../../../models/api-response/ml/product-views-response.models"
import { VisitsReducerResponse } from "../../../models/reducers/visits-reducer.models"

const productVisitsReducer = (
  visits: Array<ProductVisitsMlResponse>
): VisitsReducerResponse => {
  const catalogVisitsReducer = visits.reduce(
    (acc, curr, i) => {
      curr.results.forEach((e) => {
        const date = new Date(e.date).toISOString().slice(0, 10)
        acc.dates[date] = (acc.dates[date] || 0) + e.total
        acc.totalVisits = acc.totalVisits + e.total
      })
      acc.visitsBySeller.push(curr.total_visits)
      return acc
    },
    {
      dates: {},
      visitsBySeller: [],
      dailyAvg: 0,
      totalVisits: 0,
    }
  )
  const datesArray = Object.entries(catalogVisitsReducer.dates)
  const daysAmount = datesArray.length || 1

  catalogVisitsReducer.dailyAvg = catalogVisitsReducer.totalVisits / daysAmount

  return catalogVisitsReducer
}

export { productVisitsReducer }
