export interface MLProductPrices {
  id: string
  prices: Price[]
}
interface Price {
  id: string
  type: string
  amount: number
  regular_amount?: number
  currency_id: string
  last_updated: string
  conditions: Conditions
}
interface Conditions {
  context_restrictions: string[]
  start_time?: string
  end_time?: string
}
