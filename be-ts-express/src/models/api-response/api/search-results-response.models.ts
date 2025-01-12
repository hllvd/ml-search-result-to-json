export interface SearchResultApiResponse {
  searchTerm: string
  url: string
  items: Array<SearchResultItems>
}
export interface SearchResultItems {
  link: string
  isProduct: boolean
  price: number
  id: string
  index: number
}
