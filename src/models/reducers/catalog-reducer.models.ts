import { String } from "aws-sdk/clients/sagemaker"

export interface CatalogReducerResponse {
  title: String
  ean: string | null
  brandModel: {
    brand: string | null
    model: string | null
    color: string | null
  }
  price: {
    top5Avg: number | null
    best: number | null
    secondBest: number | null
  }
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
  state: { [key: string]: number }
}
