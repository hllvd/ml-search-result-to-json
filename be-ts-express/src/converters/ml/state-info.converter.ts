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
export const catalogStateFieldsConverter = (
  catalogReducerResponse: CatalogReducerResponse
): Array<StateFieldsRepositoryArguments> => {
  console.log("catalogReducerResponse", catalogReducerResponse)
  const { shipmentByState, medalByState, categoryId, catalogId } =
    catalogReducerResponse
  const types = [
    { type: "shipment", data: shipmentByState },
    { type: "medal", data: medalByState },
  ]
  const stateFieldsRepository = types.flatMap(
    ({ type, data }: { type: any; data: any }) =>
      Object.entries(data)
        .flatMap(([key, values]) => {
          const subType = key as StateFieldSubType
          if (!values) return []
          return Object.entries(values).map(([state, qty]) => {
            let stateFields: StateFieldsRepositoryArguments = {
              productCatalog: catalogId,
              state,
              type,
              subType,
              value: qty,
            } as StateFieldsRepositoryArguments
            return stateFields
          })
        })
        .flat(1)
  )
  return stateFieldsRepository.map(
    (e: StateFieldsRepositoryArguments) => e as StateFields
  )
}

/**
 * state: string

  @PrimaryColumn({ type: "varchar" })
  type: StateFieldType

  @PrimaryColumn({ type: "varchar", length: 24 })
  subType: StateFieldSubType

  @Column({ type: "float" })
  value: number

  @PrimaryColumn()
  @ManyToOne(() => ProductsCatalogs, (pc) => pc.id, {
    cascade: true,
  })
  @JoinColumn()
  productCatalog: string


  type: StateFieldType
  subType: StateFieldSubType
  productsCatalogsId: string
  productsCatalogsType: EntityType
  state: string
  value: number
 */
