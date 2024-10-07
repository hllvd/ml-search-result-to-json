import { ChildrenCategoriesMlResponse } from "../../models/api-response/ml/categories-response.models"
import { fetchChildrenCategories } from "./api/categories.api.service"

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
  return listOfChildrenCategories
}
