import { ChildrenCategoriesMlResponse } from "../../models/api-response/ml/categories-response.models"
import { fetchChildrenCategories } from "./api/categories.api.service"

export const getCategories = async ({
  parentId,
  userId,
}: {
  parentId?: string
  userId: string
}): Promise<ChildrenCategoriesMlResponse[]> => {
  const listOfChildrenCategories = await fetchChildrenCategories({
    parentId,
    userId,
  })
  return listOfChildrenCategories
}
