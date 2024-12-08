import { Categories } from "../../entities/sql/categories.entity"
import {
  CategoriesApiResponse,
  Pathfromroot,
} from "../../models/api-response/api/categories-response.model"
import { ChildrenCategoriesMlResponse } from "../../models/api-response/ml/categories-response.models"
import { CategoryMetadata } from "../../models/dto/ml-category-info.models"
import { ScrapeCategoryMetadata } from "../../models/predicate/category-metadata.models"
import {
  CategoryData,
  CategoryWebCrawlerPredicateResult,
  ScrapCategoryMetadata,
} from "../../models/predicate/category-tree.models"
import categoryPersistence from "../persistence/category.persistence"

import {
  fetchCategoryInfo,
  fetchChildrenCategories,
} from "./api/categories.api.service"
import { CategoryRootPredicateResponse } from "./scraper/predicate/category/category-children.predicate.service"
import {
  scrapCategoryChildren,
  scrapCategoryItems,
  scrapCategoryRootTree,
  scrapeCategoryMetadata,
} from "./scraper/predicate/helpers/categories.scrap.service"

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

export const getCategoriesMetaData = async ({
  categoryId,
  userId,
}: {
  categoryId: string
  userId: string
}): Promise<
  | {
      id: string
      name: string
      url: string
      parentId: string
      isList: boolean
      hasChildren: boolean
      searchTerm?: string
    }
  | CategoryWebCrawlerPredicateResult
  | Promise<CategoriesApiResponse>
  | any
> => {
  const categoryInfo = await getCategoryInfo({ categoryId, userId })

  const { path_from_root: pathFromRoot } = categoryInfo

  const categoryMetadata = await traceRoutePathUntilGetCategoryMetadata({
    pathFromRoot,
    userId,
  })

  return categoryMetadata
}

const traceRoutePathUntilGetCategoryMetadata = async ({
  pathFromRoot,
  userId,
}: {
  pathFromRoot: Array<Pathfromroot>
  userId: string
}): Promise<CategoryMetadata> | null => {
  let scrapedData: CategoryMetadata = { categoryId: null }
  let currentData: CategoryData = {}
  let categoryChildren: Array<CategoryData>
  let categoryRoot: Array<CategoryRootPredicateResponse>
  for (const [index, { name, id }] of pathFromRoot.entries()) {
    console.log(name)
    if (index == 0) {
      // Root category
      categoryRoot = await scrapCategoryRootTree()
      categoryChildren = categoryRoot
        .filter((e) => e.name == name)
        .flatMap((e) => e.childrenList.flat(1))
      continue
    }
    currentData = categoryChildren.find((e) => e.name == name)
    console.log("currentData", currentData)
    scrapedData = (await scrapeCategoryMetadata(
      currentData.url
    )) as CategoryMetadata
    scrapedData.categoryId = id
    if (scrapedData) {
      const { categoryChildren: childrenItems } = scrapedData
      categoryChildren = childrenItems
    }
  }
  return scrapedData as CategoryMetadata
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

const _getRootCategory = async ({
  categoryInfo,
  userId,
}: {
  categoryInfo: CategoriesApiResponse
  userId: string
}): Promise<CategoriesApiResponse> => {
  const rootCategory = categoryInfo?.path_from_root?.[0]
  if (rootCategory.id === categoryInfo.id) return Promise.resolve(categoryInfo)
  return await getCategoryInfo({ categoryId: rootCategory.id, userId })
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
  const categoryFromDb: Categories = await categoryPersistence.get(categoryId)
  //TODO
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
      permaLink: "",
      hasItems: false,
      hasChildren: false,
      parentId: "",
    }
    // categoryPersistent.upsert(categoryFetch)
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
