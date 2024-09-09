export interface ProductResponse {
  productId: string
  id: string
  site_id: string
  title: string
  seller_id: number
  mlSeller: MLUser
  category_id: string
  official_store_id: number
  price: number
  price_promotional: number
  base_price: number
  original_price: any
  currency_id: string
  initial_quantity: number
  sale_terms: SaleTerm[]
  buying_mode: string
  listing_type_id: string
  condition: string
  permalink: string
  thumbnail_id: string
  thumbnail: string
  pictures: Picture[]
  video_id: any
  descriptions: any[]
  accepts_mercadopago: boolean
  non_mercado_pago_payment_methods: any[]
  shipping: Shipping
  international_delivery_mode: string
  seller_address: SellerAddress
  seller_contact: any
  location: Location
  coverage_areas: any[]
  attributes: Attribute[]
  listing_source: string
  variations: Variation[]
  status: string
  sub_status: any[]
  tags: string[]
  warranty: string
  catalog_product_id: any
  domain_id: string
  parent_item_id: any
  deal_ids: any[]
  automatic_relist: boolean
  date_created: string
  last_updated: string
  health: number
  catalog_listing: boolean
}

export interface MLUser {
  id: number
  nickname?: string
  address?: { state: string } // ex. BR-RS, BR-SP
  user_type?: string
  site_id?: string
  permalink?: string
  seller_reputation?: {
    level_id?: "5_green" // "5_green"
    power_seller_status?: PowerSellerStatus | null
    transactions?: { period: string; total: number } // period:historic, total:4234
  }
}

export const enum PowerSellerStatus {
  Platinum = "platinum",
  Gold = "gold",
  Silver = "silver",
}

interface SaleTerm {
  id: string
  name: string
  value_id?: string
  value_name: string
  value_struct?: any
  values: any
  value_type: string
}

interface Picture {
  id: string
  url: string
  secure_url: string
  size: string
  max_size: string
  quality: string
}

interface Shipping {
  mode: string
  methods: any[]
  tags: string[]
  dimensions: any
  local_pick_up: boolean
  free_shipping: boolean
  logistic_type: string
  store_pick_up: boolean
}

interface SellerAddress {
  city: City
  state: State
  country: Country
  search_location: SearchLocation
  id: number
}

interface City {
  id: string
  name: string
}

interface State {
  id: string
  name: string
}

interface Country {
  id: string
  name: string
}

interface SearchLocation {
  neighborhood: Neighborhood
  city: City2
  state: State2
}

interface Neighborhood {
  id: string
  name: string
}

interface City2 {
  id: string
  name: string
}

interface State2 {
  id: string
  name: string
}

interface Location {}

interface Attribute {
  id: string
  name: string
  value_id?: string
  value_name: string
  values: any
  value_type: string
}

interface Variation {
  id: number
  price: number
  attribute_combinations: AttributeCombination[]
  sale_terms: any[]
  picture_ids: string[]
  catalog_product_id: any
}

interface AttributeCombination {
  id: string
  name: string
  value_id: string
  value_name: string
  values: any
  value_type: string
}
