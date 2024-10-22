import { CategoriesChildrenResponse } from "../../../models/api-response/api/categories-children-response.model"
import { CategoriesRootResponse } from "../../../models/api-response/api/categories-root-response.model"
import { ChildrenCategoriesMlResponse } from "../../../models/api-response/ml/categories-response.models"
import { fetchMl } from "../fetcher-api.ml.service"

export type CategoriesApiResponse =
  | CategoriesRootResponse
  | CategoriesChildrenResponse
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

  const childrenCats: CategoriesApiResponse = await fetchMl(url, options)

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
}): Promise<CategoriesChildrenResponse> => {
  const options = {
    userId,
    method: "GET",
  }
  const url = `/categories/${categoryId}`
  const catInfo: CategoriesChildrenResponse = await fetchMl(url, options)
  console.log(catInfo)
  return catInfo as CategoriesChildrenResponse
}
