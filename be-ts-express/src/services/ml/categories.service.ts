import { Categories } from "../../entities/sql/categories.entity"
import { ScrapeType } from "../../enums/scrap-type.enum"
import { CategoriesChildrenResponse } from "../../models/api-response/api/categories-children-response.model"
import { ChildrenCategoriesMlResponse } from "../../models/api-response/ml/categories-response.models"
import categoryPersistent from "../persistence/category.persistence"
import {
  fetchCategoryInfo,
  fetchChildrenCategories,
} from "./api/categories.api.service"
import { webScrapeSearchResultToIdAndPricePredicate } from "./scraper/predicate/list/list.scaper.service"
import { webScrapeMlPage } from "./scraper/web.scraper.service"

export const getChildCategories = async ({
  categoryId,
  userId,
}: {
  categoryId?: string
  userId: string
}): Promise<ChildrenCategoriesMlResponse[]> => {
  const listOfChildrenCategories = await fetchChildrenCategories({
    categoryId,
    userId,
  })
  console.log("listOfChildrenCategories", listOfChildrenCategories)
  return listOfChildrenCategories
}

export const getCategoryInfo = async ({
  categoryId,
  userId,
}): Promise<CategoriesChildrenResponse> => {
  const categoryInfo = await fetchCategoryInfo({
    categoryId,
    userId,
  })
  return categoryInfo
}

/**
 * Try to get the category info from the cache/db, if not found, fetch it from the API
 * @param categoryId
 * @param userId
 */
export const getPersistentCategoryInfo = async ({
  categoryId,
  userId,
}): Promise<Categories> => {
  const categoryFromDb: Categories = await categoryPersistent.get(categoryId)
  // if (!categoryFromDb) {
  if (true) {
    const fetchedCategoryInfo = await getCategoryInfo({
      categoryId,
      userId,
    })
    const categoryFetch: Categories = {
      id: fetchedCategoryInfo.id,
      name: fetchedCategoryInfo.name,
      totalItems: fetchedCategoryInfo.total_items_in_this_category,
    }
    categoryPersistent.upsert(categoryFetch)
    return categoryFetch
  }
  return categoryFromDb
}

interface CategorySearchItem {
  id: string
  position: number
  currentPrice: number
}

export const getItemsFromCategory = async ({
  categoryId,
  userId,
}): Promise<Array<CategorySearchItem>> => {
  const maxPage = 5
  const searchUrl = `https://lista.mercadolivre.com.br/acessorios-para-veiculos-c_NoIndex_True`
  const productListFromCategory: Array<{
    productIdStr: string
    price: number
  }> = await webScrapeMlPage(webScrapeSearchResultToIdAndPricePredicate, {
    searchUrl,
    scrapeType: ScrapeType.CategoryProductList,
    maxPage,
  })
  console.log("productListFromCategory", productListFromCategory)
  return [{ id: "123", position: 2, currentPrice: 2 }]
}
