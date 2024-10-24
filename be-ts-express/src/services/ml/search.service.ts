import { ScrapeType } from "../../enums/scrap-type.enum"
import { minimalPathUrl, searchUrlGenerator } from "../../utils/url.util"
import { webScrapeSearchResultToIdAndPricePredicate } from "./scraper/predicate/list/list.scaper.service"
import { webScrapeMlPage } from "./scraper/web.scraper.service"

export const searchItems = async ({
  searchTerm,
  categoryId,
}: {
  searchTerm?: string
  categoryId?: string
  userId: string
}): Promise<{ searchTerm: string; url: string; items: Array<any> }> => {
  const maxPage = 5
  const baseUrl = `https://lista.mercadolivre.com.br`
  const searchTermWithBaseUrl = searchUrlGenerator({ searchTerm, baseUrl })
  const searchUrl = minimalPathUrl(searchTermWithBaseUrl)

  const productListFromCategory: Array<{
    productIdStr: string
    price: number
  }> = await webScrapeMlPage(webScrapeSearchResultToIdAndPricePredicate, {
    searchUrl,
    scrapeType: ScrapeType.CategoryProductList,
    maxPage,
  })

  return {
    searchTerm,
    url: searchUrl,
    items: productListFromCategory,
  }
}
