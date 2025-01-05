export interface SearchResultApiResponse {
  searchTerm: string
  url: string
  items: Array<{
    link: string
    isProduct: boolean
    price: number
    id: string
    index: number
  }>
}
