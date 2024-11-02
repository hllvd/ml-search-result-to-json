import { ScrapeType } from "../../../../../enums/scrap-type.enum"
import {
  CategoryData,
  ScrapCategoryMetadata,
} from "../../../../../models/predicate/category-tree.models"
import { webScrapeMlPage } from "../../web.scraper.service"
import {
  categoryChildrenPredicate,
  categoryRootPredicate,
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
  const scrapedContent = await webScrapeMlPage(categoryMetadataPredicate, {
    categoryUrl,
    scrapeType: ScrapeType.CategoryMetadata,
  })
  return { categoryUrl, ...scrapedContent }
}

/**
 * TODO
 */
const scrapCategoryItems = async (categoryUrl: string): Promise<any> => {
  const scrapedContent = await webScrapeMlPage(categoryItemsPredicate, {
    categoryUrl,
    scrapeType: ScrapeType.CategoryProductList,
  })
  return { categoryUrl, ...scrapedContent }
}

const scrapCategoryChildren = async (
  categoryUrl: string
): Promise<Array<CategoryData>> => {
  const scrapedContent = await webScrapeMlPage(categoryChildrenPredicate, {
    categoryUrl,
    scrapeType: ScrapeType.CategoryChildren,
  })
  return scrapedContent
}

const scrapCategoryRootTree = async (): Promise<Array<CategoryData>> => {
  const scrapedContent = await webScrapeMlPage(categoryRootPredicate, {
    scrapeType: ScrapeType.CategoryRoot,
  })
  return scrapedContent
}

export {
  scrapCategoryRelatedSearches,
  scrapCategoryChildren,
  scrapCategoryRootTree,
  scrapCategoryItems,
}
