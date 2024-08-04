export type ProductId = string

export interface MLProduct {
  id: ProductId
  site_id?: string
  user?: any
  title?: string
  seller_id?: number
  category_id?: string
  official_store_id?: number
  price: number
  base_price?: number
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
  shipping?: Shipping
  international_delivery_mode?: string
  seller_contact?: any
  location?: Location
  coverage_areas?: any[]
  tags?: string[]
  catalog_product_id?: string
  date_created?: string
  last_updated?: string
}

export interface Shipping {
  mode?: string
  methods?: any[]
  tags?: string[]
  dimensions?: any
  local_pick_up?: boolean
  free_shipping?: boolean
  logistic_type?: string
  store_pick_up?: boolean
}

export enum LogisticType {
  full = "fulfillment",
}

export interface Location {}
