import { ScrapeType } from "../../enums/scrap-type.enum"
import { SearchResultApiResponse } from "../../models/api-response/api/search-results-response.models"
import { removeProductDuplicates } from "../../utils/array.util"
import { webScrapeSearchResultMetadata } from "./scraper/predicate/list/list.scaper.service"
import { webScrapeMlPage } from "./scraper/web.scraper.service"

export const searchItems = async ({
  searchTerm,
}: {
  searchTerm?: string
  categoryId?: string
  userId: string
}): Promise<SearchResultApiResponse> => {
  const maxPage = 5

  const { result: productListFromSearch, pages } = await webScrapeMlPage(
    webScrapeSearchResultMetadata,
    {
      searchTerm,
      scrapeType: ScrapeType.SearchMetadata,
      maxPage,
    }
  )

  const url = pages[0] ?? null

  const productList = removeProductDuplicates(productListFromSearch)
  const productIndexFixes = productList.map((product, index) => ({
    ...product,
    index: index + 1,
  }))

  return {
    searchTerm,
    url,
    items: productIndexFixes,
  }
}
