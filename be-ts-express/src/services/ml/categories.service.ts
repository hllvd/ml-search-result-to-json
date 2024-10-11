import { Categories } from "../../entities/sql/categories.entity"
import { CategoriesChildrenResponse } from "../../models/api-response/api/categories-children-response.model"
import { ChildrenCategoriesMlResponse } from "../../models/api-response/ml/categories-response.models"
import categoryPersistent from "../persistence/category.persistence"
import {
  fetchCategoryInfo,
  fetchChildrenCategories,
} from "./api/categories.api.service"

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

  if (!categoryFromDb) {
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
