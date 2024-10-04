import { EntityType } from "../../enums/entity-type.enum"
import {
  StateFieldType,
  StateFieldSubType,
} from "../../enums/state-field-type.enum"

export interface StateFieldsRepositoryArguments {
  type: StateFieldType
  subType: StateFieldSubType
  productsCatalogsId: string
  productsCatalogsType: EntityType
  state: string
  value: number
}
