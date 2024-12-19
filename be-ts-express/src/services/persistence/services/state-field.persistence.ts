import dataSource from "../../../db/data-source"
import { StateFields } from "../../../entities/sql/state-fields.entity"
import {
  StateFieldType,
  StateFieldSubType,
} from "../../../enums/state-field-type.enum"

const flushAndInsert = async (stateFieldInfo: StateFields[]) => {
  await dataSource.manager.delete(StateFields, {
    productCatalog: stateFieldInfo[0].productCatalog,
  })

  await dataSource.manager.upsert(StateFields, stateFieldInfo, [
    "state",
    "subType",
    "productCatalog",
  ])
}

export default { flushAndInsert }
