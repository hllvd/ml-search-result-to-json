import dataSource from "../../../db/data-source"
import { StateFields } from "../../../entities/sql/state-fields.entity"

const upsert = async (stateFieldInfo: StateFields[]) => {
  console.log("stateFieldInfo", stateFieldInfo)
  return await dataSource.manager.upsert(StateFields, stateFieldInfo, [
    "state",
    "subType",
    "productCatalog",
  ])
}

export default { upsert }
