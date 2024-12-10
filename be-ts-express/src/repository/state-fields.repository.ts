import dataSource from "../db/data-source"
import { ProductsCatalogs } from "../entities/sql/products-catalogs.entity"
import { StateFields } from "../entities/sql/state-fields.entity"
import { StateFieldsRepositoryArguments } from "../models/params/state-fields-repository.model"

/**
 * type: StateFieldType
 * productsCatalogsId: string
 * productsCatalogsType: EntityType
 * state: string
 * value: number
 */
export const stateFieldsRepository = async (
  arg: StateFieldsRepositoryArguments | Array<StateFieldsRepositoryArguments>
) => {
  const argArray = Array.isArray(arg) ? arg : [arg]
  const productCatalogCollection =
    _createProductsCatalogCollectionAndRemoveDuplicates(argArray)

  await dataSource.manager.upsert(ProductsCatalogs, productCatalogCollection, [
    "id",
  ])

  const stateFieldCollection = _createStateFieldsCollection(argArray)
  await dataSource.manager.upsert(StateFields, stateFieldCollection, [
    "state",
    "subType",
    "productCatalog",
  ])
}

const _createProductsCatalogCollectionAndRemoveDuplicates = (
  argArray: Array<StateFieldsRepositoryArguments>
): Array<ProductsCatalogs> => {
  const uniqueCatalogsMap = new Map<string, ProductsCatalogs>()
  argArray.forEach((arg) => {
    const { productCatalog } = arg
    if (!uniqueCatalogsMap.has(productCatalog)) {
      const productsCatalogs = new ProductsCatalogs()
      productsCatalogs.id = productCatalog
      uniqueCatalogsMap.set(productCatalog, productsCatalogs)
    }
  })

  return Array.from(uniqueCatalogsMap.values())
}

const _createStateFieldsCollection = (
  argArray: Array<StateFieldsRepositoryArguments>
): Array<StateFields> => {
  const stateFieldsArray = argArray.map((arg) => {
    const { type, subType, state, value, productCatalog } = arg
    const stateFields = new StateFields()
    stateFields.type = type
    stateFields.subType = subType
    stateFields.state = state
    stateFields.value = value
    stateFields.productCatalog = productCatalog
    return stateFields
  })
  return stateFieldsArray
}
