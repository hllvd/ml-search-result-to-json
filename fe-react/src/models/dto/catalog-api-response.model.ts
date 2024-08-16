export interface CatalogInformationResponse {
  catalogId: string
  title: string
  ean: string
  brandModel: BrandModel
  permalink: string
  thumbnail: string
  price: Price
  bestPriceFull: number
  position: Position
  length: number
  dateCreated: string
  mlOwner: boolean
  shipmentByState: ShipmentByState
  medalByState: MedalByState
  state: State
  revenue: number
  dailyRevenue: number
}

interface State {
  [key: string]: any
}
interface MedalByState {
  [key: string]: any
}

interface MedalLider {
  [key: string]: number
}
interface ShipmentByState {
  [key: string]: any
}

interface Position {
  [key: string]: number
}
interface Price {
  top5Avg: number
  best: number
  secondBest: number
}
interface BrandModel {
  brand: string
  model?: any
  color?: any
}
