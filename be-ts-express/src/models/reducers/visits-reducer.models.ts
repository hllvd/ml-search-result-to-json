export interface VisitsReducerResponse {
  dates: { [key: string]: number } | [{ [key: string]: number }]
  visitsBySeller: number[]
  totalVisits: number
  dailyAvg: number
}
