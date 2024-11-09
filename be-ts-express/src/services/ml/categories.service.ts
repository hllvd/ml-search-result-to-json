import { Categories } from "../../entities/sql/categories.entity"
import { CategoriesApiResponse } from "../../models/api-response/api/categories-response.model"
import { ChildrenCategoriesMlResponse } from "../../models/api-response/ml/categories-response.models"
import { CategoryWebCrawlerPredicateResult } from "../../models/predicate/category-tree.models"
import categoryPersistent from "../persistence/category.persistence"
import {
  fetchCategoryInfo,
  fetchChildrenCategories,
} from "./api/categories.api.service"
import {
  scrapCategoryItems,
  scrapeCategorySearchTerms,
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
  console.log("pathFromRoot", pathFromRoot)
  //const a = await _traceRoutePath({ pathFromRoot, userId })

  // const categoryUrl =
  //   "https://lista.mercadolivre.com.br/beleza-cuidado-pessoal/cuidados-cabelo/cremes-pentear/_NoIndex_True?original_category_landing=true"
  // const categoryUrl =
  //   "https://lista.mercadolivre.com.br/beleza-cuidado-pessoal/cuidados-cabelo/cremes-pentear/"
  // const categoryUrl =
  //   "https://lista.mercadolivre.com.br/eletrodomesticos/fornos-fogoes/coifas-depuradores"
  // const categoryUrl =
  //   "https://lista.mercadolivre.com.br/ferramentas/ferramentas-eletricas/"
  const categoryUrl =
    "https://lista.mercadolivre.com.br/construcao/materiais-obra/"
  const cateChild = await scrapeCategorySearchTerms(categoryUrl)

  return cateChild

  // const root = await scrapCategoryRootTree()
  // return root

  return categoryInfo

  // return {
  //   id: categoryId,
  //   name: categoryInfo.name,
  //   url: categoryInfo.permalink,
  //   parentId: _getParentIdFromCategory(categoryInfo),
  //   isList: false,
  //   hasChildren: _hasChildren(categoryInfo),
  //   searchTerm: "",
  // }
}

// const _traceRoutePath = async ({
//   pathFromRoot,
//   userId,
// }: {
//   pathFromRoot: Array<Pathfromroot>
//   userId: string
// }): Promise<ScrapCategoryMetadata> => {
//   let categoryMetadata: Array<CategoryData>
//   for (const [index, { name, id }] of pathFromRoot.entries()) {
//     if (index == 0) {
//       // Root category
//       const rootId = id
//       const rootCategory = await getCategoryInfo({ categoryId: rootId, userId })
//       const rootCategoryUrl = rootCategory.permalink
//       categoryMetadata = await scrapCategoryChildren(rootCategoryUrl)
//       continue
//     }
//     const { categoryTree } = categoryMetadata
//     const currentCategoryUrl =
//       categoryTree.find((e) => e.name == name)?.url ||
//       categoryTree
//         .flatMap((e) => e.childrenList.flat(1))
//         .find((e) => e.name == name)?.url
//     console.log(name, id, currentCategoryUrl)
//     if (currentCategoryUrl) {
//       categoryMetadata = await scrapCategoryChildren(currentCategoryUrl)
//     }
//   }

//   return categoryMetadata
// }

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
