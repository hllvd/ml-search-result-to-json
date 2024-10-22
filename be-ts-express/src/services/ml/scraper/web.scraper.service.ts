import axios from "axios"
import { ScrapeType } from "../../../enums/scrap-type.enum"
import { ProductId } from "../../../models/dto/ml-product.models"

/**
 * read more https://scrapfly.io/blog/web-scraping-with-nodejs/
 * @param predicateSelector
 * @param options
 * @returns
 */
interface WebScraperMlPageOption {
  scrapeType: ScrapeType
  page?: number
  catalogId?: string
  productId?: string
  categoryId?: string
  searchUrl?: string
  maxPage?: number | null
}
const webScrapeMlPage = async (
  predicateSelector: Function,
  options?: WebScraperMlPageOption
): Promise<any> => {
  const r = await fetchWithRetry({
    options,
    retries: 10,
    predicateSelector,
  })
  return r
}

const fetchWithRetry = async ({
  options,
  retries,
  predicateSelector,
}: {
  options: WebScraperMlPageOption
  retries: number
  predicateSelector: Function
}): Promise<Array<{ productIdStr: string; price: number }>> => {
  const { maxPage } = options
  const urlBuilder = webScrapeMlUrlBuilder(options)
  let resultArray: Array<any> = []
  let areTherePages = true
  let currentPage: number = 1
  while (areTherePages) {
    try {
      const response = await webScrapeFetcher(
        urlBuilder.getCurrentUrl(),
        retries
      )

      const { nextPage, response: currentPageResult } = await predicateSelector(
        response
      )

      if (!Array.isArray(currentPageResult)) return currentPageResult

      if (currentPageResult == null)
        throw new Error("Predicate response is null")
      resultArray = [...resultArray, ...currentPageResult]

      if (currentPage === maxPage) break
      currentPage++
      if (!nextPage) break
      urlBuilder.nextPage()
    } catch (e) {
      console.error(e)
      areTherePages = false
    }
  }
  return resultArray ?? null
}

const webScrapeFetcher = async (url: string, retries: number) => {
  let counter = 0
  let response = null
  console.log("scrap", url)
  while (counter < retries) {
    try {
      response = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/png,*/*;q=0.8",
        },
      })
      break
    } catch {
      counter++
    }
  }
  return response
}

const webScrapeMlUrlBuilder = (options) => {
  let currentPage
  let isPagerWorking = true
  let page = options.page ?? 1
  const { catalogId, productId, searchUrl } = options

  const getCurrentUrlScope = () => {
    switch (options.scrapeType) {
      case ScrapeType.CatalogProductList:
        currentPage = `https://www.mercadolivre.com.br/p/${catalogId}/s?page=${page}`
        return currentPage
      case ScrapeType.CatalogMetadata:
        isPagerWorking = false
        currentPage = `https://www.mercadolivre.com.br/p/${catalogId}`
        return currentPage
      case ScrapeType.ProductPage:
        isPagerWorking = false
        currentPage = `https://produto.mercadolivre.com.br/${productId}`
        return currentPage
      case ScrapeType.CategoryProductList:
        isPagerWorking = false
        currentPage = `${searchUrl}?page=${page}`
        return currentPage
      default:
        throw new Error("Invalid scrape type")
    }
  }
  return {
    getCurrentUrl: () => getCurrentUrlScope(),
    nextPage: () => {
      if (!isPagerWorking) return
      page++
      return getCurrentUrlScope()
    },
  }
}

export { webScrapeMlPage }
