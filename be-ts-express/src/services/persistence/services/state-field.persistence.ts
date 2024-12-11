import dataSource from "../../../db/data-source"
import { StateFields } from "../../../entities/sql/state-fields.entity"

const upsert = async (stateFieldInfo: StateFields[]) => {
  await dataSource.manager.upsert(StateFields, stateFieldInfo, [
    "state",
    "subType",
    "productCatalog",
  ])
  const stateFieldsRepository = dataSource.getRepository(StateFields)
  let views = await stateFieldsRepository.findOne({
    where: { productCatalog: stateFieldInfo[0].productCatalog },
  })
  return views
}

const upsertStateFields = async (stateFieldInfo: StateFields[]) => {
  await dataSource.manager.upsert(StateFields, stateFieldInfo, [
    "state",
    "subType",
    "productCatalog",
  ])
}

export default { upsert, upsertStateFields }
