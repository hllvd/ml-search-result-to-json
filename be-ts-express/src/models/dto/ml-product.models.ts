import { MLProductResponse } from "../api-response/product-response.models"
import { MLUser } from "./ml-user.models"

export type ProductId = string

export interface MLProduct extends MLProductResponse {
  id: ProductId
  ean?: string
  site_id?: string
  user?: MLUser
  pictures?: any
  attributes?: any
  title?: string
  seller_id?: number
  category_id?: string
  official_store_id?: number
  price: number
  base_price?: number
  current_price?: number
  original_price?: number
  currency_id?: string
  initial_quantity?: number
  buying_mode?: string
  listing_type_id?: string
  condition?: string
  permalink: string
  thumbnail_id?: string
  thumbnail?: string
  video_id?: any
  international_delivery_mode?: string
  seller_contact?: any
  location?: Location
  coverage_areas?: any[]
  tags?: string[]
  catalog_product_id?: string
  date_created?: string
  last_updated?: string
  owner: boolean
  revenue?: number
  quantity_sold?: number
  daily_revenue?: number
  has_promotion?: boolean
  commissions?: MLProductCommission
}
interface MLProductCommission {
  fixedCommissionPrice: number
  fixedShipmentPrice: number
  shipmentCommission: number
  percentageCommission: number
  totalCommission: number
  grossProfit: number
}
