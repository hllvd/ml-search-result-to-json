import dataSource from "../../../db/data-source"
import { CatalogFields } from "../../../entities/sql/catalog-fields.entity"

const upsert = async (catalogFieldsInfo: CatalogFields) => {
  const catalogFieldsRepository = dataSource.getRepository(CatalogFields)
  let catalogFields = await catalogFieldsRepository.findOne({
    where: { id: catalogFieldsInfo.id },
  })
  if (!catalogFields) catalogFields = new CatalogFields()
  catalogFields = catalogFieldsRepository.merge(catalogFields, {
    ...catalogFieldsInfo,
  })
  return await dataSource.manager.upsert(CatalogFields, [catalogFields], ["id"])
}

export default { upsert }
