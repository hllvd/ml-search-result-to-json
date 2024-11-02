export interface CategoryWebCrawlerPredicateResult {
  categoryTree: Array<CategoryTreeWebCrawler>
}
export interface ScrapCategoryMetadata
  extends CategoryWebCrawlerPredicateResult {
  categoryUrl?: string
}
export interface CategoryTreeWebCrawler extends CategoryData {
  categoryUrl?: any
  url: string
  name: string
  childrenList: Array<CategoryData>
}
export interface CategoryData {
  name?: string
  url?: string
}
