export interface CategoryTreeWebCrawler {
  parentUrl: string
  parentName: string
  childrenList: Array<{
    childUrl: string
    childName: string
  }>
}
