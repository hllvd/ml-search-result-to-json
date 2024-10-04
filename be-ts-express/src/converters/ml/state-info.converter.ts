import { StateFields } from "../../entities/sql/state-fields.entity"
import { EntityType } from "../../enums/entity-type.enum"
import { StateFieldSubType } from "../../enums/state-field-type.enum"
import { StateFieldsRepositoryArguments } from "../../models/params/state-fields-repository.model"
import { CatalogReducerResponse } from "../../models/reducers/catalog-reducer.models"

/**
 * Converts _ProductApiResponse_ to _StateFields_
 * @param catalogReducerResponse
 * @returns
 */
export const stateInfoConverter = (
  catalogReducerResponse: CatalogReducerResponse
): Array<StateFieldsRepositoryArguments> => {
  const { shipmentByState, medalByState, categoryId } = catalogReducerResponse
  const types = [
    { type: "shipment", data: shipmentByState },
    { type: "medal", data: medalByState },
  ]
  return types.flatMap(({ type, data }: { type: any; data: any }) =>
    Object.entries(data)
      .flatMap(([key, values]) => {
        const subType = key as StateFieldSubType
        if (!values) return []
        return Object.entries(values).map(([state, qty]) => {
          let stateFields: StateFieldsRepositoryArguments = {
            productsCatalogsId: categoryId,
            state,
            type,
            subType,
            value: qty,
            productsCatalogsType: EntityType.Catalog,
          } as StateFieldsRepositoryArguments
          return stateFields
        })
      })
      .flat(1)
  )
}

/**
   * await stateFieldsRepository({
    type: StateFieldType.Shipment,
    state: "BR-PR",
    value: 3,
    productsCatalogsId: "MLB19564320",
    productsCatalogsType: EntityType.catalog,
  })
   */
