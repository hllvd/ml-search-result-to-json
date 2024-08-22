export interface ProductVisitsResponse {
  item_id: string
  date_from: string
  date_to: string
  total_visits: number
  last: number
  unit: string
  results: Result[]
}
interface Result {
  date: string
  total: number
}
