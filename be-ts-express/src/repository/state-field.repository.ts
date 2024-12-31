import dataSource from "../db/data-source"
import { StateFields } from "../entities/sql/state-fields.entity"

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
