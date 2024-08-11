interface CatalogReducerResponse {
  sumPrice: number
  bestPrice: number | null
  secondBestPrice: number | null
  firstPlacePrice: number
  bestPriceFull: number | null
  fullBestPosition: number | null
  medalGoldBestPosition: number | null
  medalPlatinumBestPosition: number | null
  medalLiderBestPosition: number | null
  length: number
  priceList: Array<number>
  dateCreated: string
  state: { [key: string]: number }
  shipmentByState: {
    full: { [state: string]: number }
    correios: { [state: string]: number }
    coleta: { [state: string]: number }
    others: { [state: string]: number }
  }
  medalByState: {
    medalLider: { [state: string]: number }
    medalGold: { [state: string]: number }
    medalPlatinum: { [state: string]: number }
    noMedal: { [state: string]: number }
  }
}
