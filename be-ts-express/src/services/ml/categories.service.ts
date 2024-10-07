import { CategoriesChildrenResponse } from "../../models/api-response/api/categories-children-response.model"
import { ChildrenCategoriesMlResponse } from "../../models/api-response/ml/categories-response.models"
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
