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
