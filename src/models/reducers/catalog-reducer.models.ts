interface CatalogReducerResponse {
  price: {
    top5Avg: number | null
    best: number | null
    secondBest: number | null
  }
  firstPlacePrice: number
  bestPriceFull: number | null
  position: {
    full: number | null
    medalGold: number | null
    medalPlatinum: number | null
    medalLider: number | null
    officialStore: number | null
  }
  length: number
  mlOwner: boolean
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
