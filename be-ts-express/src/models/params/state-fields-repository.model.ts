import { EntityType } from "../../enums/entity-type.enum"
import {
  StateFieldType,
  StateFieldSubType,
} from "../../enums/state-field-type.enum"

export interface StateFieldsRepositoryArguments {
  productCatalog: string
  type: StateFieldType
  subType: StateFieldSubType
  //productsCatalogsId?: string
  state: string
  value: number
}
