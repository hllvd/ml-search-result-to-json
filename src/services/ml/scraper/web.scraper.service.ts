import { ScrapeType } from "../../../enums/scrap-type.enum"

/**
 * read more https://scrapfly.io/blog/web-scraping-with-nodejs/
 * @param predicateSelector
 * @param options
 * @returns
 */
const webScrapeMlPage = async (predicateSelector: Function, options) => {
  const url = webScrapeMlUrlBuilder(options)
  console.log("url", url)
  const r = await fetchWithRetry(url, 10, predicateSelector)
  return r
}

const fetchWithRetry = async (
  url: string,
  retries: number,
  predicateSelector: Function
) => {
  let predicateResponse
  let count = 0
  while (count < retries) {
    try {
      predicateResponse = await predicateSelector(url)
      if (predicateResponse == null)
        throw new Error("Predicate response is null")
      break
    } catch (e) {
      console.error(`Retrying ${count}`)
    }
    count++
  }
  return predicateResponse ?? null
}

const webScrapeMlUrlBuilder = (options) => {
  switch (options.scrapeType) {
    case ScrapeType.Catalog:
      const { productId, catalogId } = options
      return `https://www.mercadolivre.com.br/p/${catalogId}/s?product_trigger_id=${productId}`
    default:
      throw new Error("Invalid scrape type")
  }
}

export { webScrapeMlPage }
