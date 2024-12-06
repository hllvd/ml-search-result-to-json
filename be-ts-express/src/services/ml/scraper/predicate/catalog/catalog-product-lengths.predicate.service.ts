import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"
import { webScrapeFetcher } from "../../web.scraper.service"

/** On catalogs with large list of products, gathering the product length is
 *  a exhaustive task and can causes  time out error.
 * This function help us to get the number of product from the catalog main page so iterate between catalog pages are no needed
 * */
const webScrapeCatalogProductLengthPredicate = async (
  response: AxiosResponse
): Promise<{ response: number }> => {
  const dom = new JSDOM(await response.data)
  const document = dom.window.document
  let pageMetadata = getCatalogPageMetadata(document) as PageMetadata
  console.log("1 pageMetadata", pageMetadata)
  const currentPageNumber = 1
  let currentPageUrl = pageMetadata.lastPageUrl
  while (currentPageNumber < pageMetadata.lastPageNumber) {
    const htmlPage = await _webScrape(currentPageUrl)
    pageMetadata = getCatalogPageMetadata(htmlPage)
    currentPageUrl = pageMetadata.lastPageUrl
    console.log("2 pageMetadata", pageMetadata)
    if (!pageMetadata.hasNext) break
  }
  const amountOfProduct = calculateHowManyProducts(pageMetadata)

  return { response: amountOfProduct }
}

const _webScrape = async (url: string) => {
  const response = await webScrapeFetcher(url, 1)
  const dom = new JSDOM(await response.data)
  const document = dom.window.document
  return document
}

const calculateHowManyProducts = (metadata: PageMetadata): number => {
  const { lastPageNumber, productsCount } = metadata
  return (lastPageNumber - 1) * 10 + productsCount
}

const getCatalogPageMetadata = (htmlPage): PageMetadata => {
  const validElements = Array.from(
    htmlPage.querySelectorAll(".andes-pagination__button a")
  )
    .map((e: HTMLAnchorElement) => {
      const url = new URL(e.href)
      const param = new URLSearchParams(url.search)
      const page = parseInt(param.get("page"))
      return { page, url: e.href }
    })
    .slice(1, -1)

  const lastElement = validElements.pop()

  const hasNext = !htmlPage.querySelector(
    ".andes-pagination__button--next.andes-pagination__button--disabled"
  )

  const productsCount =
    Array.from(htmlPage.querySelectorAll(".ui-pdp-s-results form")).length ?? 1

  console.log("productsCount", productsCount)
  return {
    lastPageNumber: lastElement.page,
    lastPageUrl: lastElement.url,
    hasNext,
    productsCount,
  }
}

interface PageMetadata {
  productsCount: number
  lastPageNumber: number
  lastPageUrl: string
  hasNext: boolean
}

export { webScrapeCatalogProductLengthPredicate }
