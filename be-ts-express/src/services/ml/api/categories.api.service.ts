import { CategoriesApiResponse } from "../../../models/api-response/api/categories-response.model"
import { CategoriesRootResponse } from "../../../models/api-response/api/categories-root-response.model"
import { ChildrenCategoriesMlResponse } from "../../../models/api-response/ml/categories-response.models"
import { fetchMl } from "../fetcher-api.ml.service"

export type CategoriesResponse = CategoriesRootResponse | CategoriesApiResponse
export const fetchChildrenCategories = async ({
  categoryId,
  userId,
}: {
  categoryId?: string
  userId: string
}): Promise<Array<ChildrenCategoriesMlResponse> | null> => {
  const options = {
    userId,
    method: "GET",
  }
  const url =
    categoryId == null ? "/sites/MLB/categories" : `/categories/${categoryId}`

  const childrenCats: CategoriesResponse = await fetchMl(url, options)

  console.log("childrenCats", childrenCats)

  return (
    "children_categories" in childrenCats
      ? childrenCats?.children_categories
      : childrenCats
  ) as Array<ChildrenCategoriesMlResponse>
}

export const fetchCategoryInfo = async ({
  categoryId,
  userId,
}: {
  categoryId?: string
  userId: string
}): Promise<CategoriesApiResponse> => {
  const options = {
    userId,
    method: "GET",
  }
  const url = `/categories/${categoryId}`
  const catInfo: CategoriesApiResponse = await fetchMl(url, options)

  return catInfo as CategoriesApiResponse
}
