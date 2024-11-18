import { ScrapeType } from "../../../../../enums/scrap-type.enum"
import { ScrapeCategoryMetadata } from "../../../../../models/predicate/category-metadata.models"
import {
  CategoryData,
  ScrapCategoryMetadata,
} from "../../../../../models/predicate/category-tree.models"
import { ensureTrailingSlash } from "../../../../../utils/url.util"
import { webScrapeMlPage } from "../../web.scraper.service"
import {
  categoryChildrenPredicate,
  categoryRootPredicate,
  CategoryRootPredicateResponse,
} from "../category/category-children.predicate.service"
import { categoryItemsPredicate } from "../category/category-items.predicate.service"
import { categoryMetadataPredicate } from "../category/category-metadata.predicate.service"

/**
 *
 * TODO related searches
 */
const scrapCategoryRelatedSearches = async (
  categoryUrl: string
): Promise<ScrapCategoryMetadata> => {
  const { result: scrapedContent } = await webScrapeMlPage(
    categoryMetadataPredicate,
    {
      categoryUrl,
      scrapeType: ScrapeType.CategoryMetadata,
    }
  )

  return { categoryUrl, ...scrapedContent }
}

/**
 * Returns search results and childItems
 * @param categoryUrl
 * @returns
 */
const scrapeCategoryMetadata = async (
  categoryUrl: string
): Promise<ScrapeCategoryMetadata> => {
  const categoryUrlWithSlashes = ensureTrailingSlash(categoryUrl)
  const { result: scrapedContent } = await webScrapeMlPage(
    categoryMetadataPredicate,
    {
      categoryUrl: categoryUrlWithSlashes,
      scrapeType: ScrapeType.CategoryMetadata,
    }
  )
  return { categoryUrl: categoryUrlWithSlashes, ...scrapedContent }
}

/**
 * TODO
 */
const scrapCategoryItems = async (categoryUrl: string): Promise<any> => {
  const { result: scrapedContent } = await webScrapeMlPage(
    categoryItemsPredicate,
    {
      categoryUrl,
      dynamicWeb: true,
      scrapeType: ScrapeType.CategoryProductList,
    }
  )
  return { categoryUrl, ...scrapedContent }
}

const scrapCategoryChildren = async (
  categoryUrl: string
): Promise<Array<CategoryData>> => {
  const { result: scrapedContent } = await webScrapeMlPage(
    categoryChildrenPredicate,
    {
      categoryUrl,
      scrapeType: ScrapeType.CategoryChildren,
    }
  )
  return scrapedContent
}

const scrapCategoryRootTree = async (): Promise<
  Array<CategoryRootPredicateResponse>
> => {
  const { result: scrapedContent } = await webScrapeMlPage(
    categoryRootPredicate,
    {
      scrapeType: ScrapeType.CategoryRoot,
    }
  )
  return scrapedContent
}

export {
  scrapCategoryRelatedSearches,
  scrapCategoryChildren,
  scrapCategoryRootTree,
  scrapCategoryItems,
  scrapeCategoryMetadata,
}
