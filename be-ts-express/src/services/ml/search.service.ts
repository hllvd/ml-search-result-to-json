import { ScrapeType } from "../../enums/scrap-type.enum"
import { minimalPathUrl, searchUrlGenerator } from "../../utils/url.util"
import { webScrapeSearchResultMetadata } from "./scraper/predicate/list/list.scaper.service"
import { webScrapeMlPage } from "./scraper/web.scraper.service"

export const searchItems = async ({
  searchTerm,
}: {
  searchTerm?: string
  categoryId?: string
  userId: string
}): Promise<{ searchTerm: string; url: string; items: Array<any> }> => {
  const maxPage = 5

  const productListFromCategory: Array<{
    productIdStr: string
    price: number
  }> = await webScrapeMlPage(webScrapeSearchResultMetadata, {
    searchTerm,
    scrapeType: ScrapeType.SearchMetadata,
    maxPage,
  })

  return {
    searchTerm,
    url: searchTerm,
    items: productListFromCategory,
  }
}
