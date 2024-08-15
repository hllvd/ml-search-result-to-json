export interface CatalogInformationResponse {
  catalogId: string
  title: string
  ean: string
  brandModel: BrandModel
  revenue: number
  dailyRevenue: number
}
export interface BrandModel {
  brand: string
  model: string
  color: string
}
