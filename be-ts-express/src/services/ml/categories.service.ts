import { Categories } from "../../entities/sql/categories.entity"
import { ScrapeType } from "../../enums/scrap-type.enum"
import { CategoriesChildrenResponse } from "../../models/api-response/api/categories-children-response.model"
import { ChildrenCategoriesMlResponse } from "../../models/api-response/ml/categories-response.models"
import { minimalPathUrl } from "../../utils/url.util"
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
}): Promise<Array<any>> => {
  const maxPage = 5
  const url = `https://lista.mercadolivre.com.br/acessorios-veiculos/pecas-carros-caminhonetes/pecas-interior/acessorios-para-veiculos-c_NoIndex_True#applied_filter_id%3Dcategory%26applied_filter_name%3DCategorias%26applied_filter_order%3D3%26applied_value_id%3DMLB114765%26applied_value_name%3DPe%C3%A7as+de+Interior%26applied_value_order%3D11%26applied_value_results%3D714%26is_custom%3Dfalse`
  const searchUrl = minimalPathUrl(url)

  const productListFromCategory: Array<{
    productIdStr: string
    price: number
  }> = await webScrapeMlPage(webScrapeSearchResultToIdAndPricePredicate, {
    searchUrl,
    scrapeType: ScrapeType.CategoryProductList,
    maxPage,
  })
  return [...productListFromCategory]
}
