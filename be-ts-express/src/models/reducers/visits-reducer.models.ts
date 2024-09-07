export interface VisitsReducerResponse {
  dates: { [key: string]: number } | [{ [key: string]: number }]
  totalVisits: number
  dailyAvg: number
}
