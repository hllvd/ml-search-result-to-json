import axios from "axios"
import { ScrapeType } from "../../../enums/scrap-type.enum"
import { ProductId } from "../../../models/dto/ml-product.models"

/**
 * read more https://scrapfly.io/blog/web-scraping-with-nodejs/
 * @param predicateSelector
 * @param options
 * @returns
 */
const webScrapeMlPage = async (predicateSelector: Function, options) => {
  const r = await fetchProductIdAndPricesWithRetry({
    options,
    retries: 10,
    predicateSelector,
  })
  return r
}

const fetchProductIdAndPricesWithRetry = async ({
  options,
  retries,
  predicateSelector,
}: {
  options: { scrapType: ScrapeType; page?: number; catalogId: string }
  retries: number
  predicateSelector: Function
}): Promise<Array<{ productIdStr: string; price: number }>> => {
  const urlBuilder = webScrapeMlUrlBuilder(options)
  let productIdsAndPrice: Array<{ productIdStr: string; price: number }> = []
  let areTherePages = true
  while (areTherePages) {
    try {
      const response = await webScrapeFetcher(
        urlBuilder.getCurrentUrl(),
        retries
      )
      const {
        nextPage,
        response: newProductIds,
        prices,
      } = await predicateSelector(response)

      const productIdsAndPricesJoin = newProductIds.map((e, i) => {
        return { productIdStr: e, price: prices[i] }
      })

      if (productIdsAndPrice == null)
        throw new Error("Predicate response is null")
      productIdsAndPrice = [...productIdsAndPrice, ...productIdsAndPricesJoin]
      console.log("nextPage", nextPage)
      if (!nextPage) break
      urlBuilder.nextPage()
    } catch (e) {
      console.error("ERRRR", e)
      areTherePages = false
    }
  }
  console.log("productIds", productIdsAndPrice)
  return productIdsAndPrice ?? null
}

const webScrapeFetcher = async (url: string, retries: number) => {
  let counter = 0
  let response = null
  console.log("url", url)
  while (counter < retries) {
    try {
      response = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
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
  const { catalogId } = options

  const getCurrentUrlScope = () => {
    switch (options.scrapeType) {
      case ScrapeType.CatalogProductList:
        currentPage = `https://www.mercadolivre.com.br/p/${catalogId}/s?page=${page}`
        return currentPage
      case ScrapeType.CatalogMetadata:
        isPagerWorking = false
        currentPage = `https://www.mercadolivre.com.br/p/${catalogId}`
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
