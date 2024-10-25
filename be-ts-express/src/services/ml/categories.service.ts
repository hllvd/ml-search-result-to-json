import { Categories } from "../../entities/sql/categories.entity"
import { CategoriesApiResponse } from "../../models/api-response/api/categories-response.model"
import { ChildrenCategoriesMlResponse } from "../../models/api-response/ml/categories-response.models"
import categoryPersistent from "../persistence/category.persistence"
import {
  fetchCategoryInfo,
  fetchChildrenCategories,
} from "./api/categories.api.service"

export const getCategories = async ({
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
}): Promise<CategoriesApiResponse> => {
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
  // TODO
  //if (!categoryFromDb) {
  if (true) {
    const fetchedCategoryInfo = await getCategoryInfo({
      categoryId,
      userId,
    })
    const permaLink = fetchedCategoryInfo.permalink
    const categoryFetch: Categories = {
      id: fetchedCategoryInfo.id,
      name: fetchedCategoryInfo.name,
      totalItems: fetchedCategoryInfo.total_items_in_this_category,
      // permaLink: permaLink,
      // parentId: _getParentIdFromCategory(fetchedCategoryInfo),
      // hasChildren: _hasChildren(fetchedCategoryInfo),
    }
    categoryPersistent.upsert(categoryFetch)
    return categoryFetch
  }
  return categoryFromDb
}

const _getParentIdFromCategory = (
  category: CategoriesApiResponse
): string | null => {
  if (!category.path_from_root) return null

  return category.path_from_root.filter((c) => c.id !== category.id)?.at(-1)?.id
}

const _hasChildren = (category: CategoriesApiResponse): boolean =>
  category.children_categories?.length > 0
