import { CategoriesChildrenResponse } from "../../../models/api-response/api/categories-children-response.model"
import { CategoriesRootResponse } from "../../../models/api-response/api/categories-root-response.model"
import { ChildrenCategoriesMlResponse } from "../../../models/api-response/ml/categories-response.models"
import { fetchMl } from "../fetcher-api.ml.service"

type CategoriesApiResponse = CategoriesRootResponse | CategoriesChildrenResponse
export const fetchChildrenCategories = async ({
  parentId,
  userId,
}: {
  parentId?: string
  userId: string
}): Promise<Array<ChildrenCategoriesMlResponse> | null> => {
  const options = {
    userId,
    method: "GET",
  }
  const url =
    parentId == null ? "/sites/MLB/categories" : `/categories/${parentId}`
  const childrenCats: CategoriesApiResponse = await fetchMl(url, options)
  return (
    "children_categories" in childrenCats
      ? childrenCats?.children_categories
      : childrenCats
  ) as Array<ChildrenCategoriesMlResponse>
}
