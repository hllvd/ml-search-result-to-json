import { MLProductCommission } from "./ProductApiResponse.model"

export interface CatalogInformationResponse {
  catalogId: string
  title: string
  ean: string
  brandModel: BrandModel
  permalink: string
  thumbnail: string
  price: Price
  position: Position
  supermarketEligible: boolean
  length: number
  dateCreated: string
  mlOwner: boolean
  shipmentByState: ShipmentByState
  medalByState: MedalByState
  state: State
  revenue: number
  dailyRevenue: number
  commissions: MLProductCommission
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
  full: number
}
interface BrandModel {
  brand: string
  model?: any
  color?: any
}
