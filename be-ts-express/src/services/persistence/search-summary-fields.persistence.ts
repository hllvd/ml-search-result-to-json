import dataSource from "../../db/data-source"
import { SearchSummaryFields } from "../../entities/sql/search-summary-fields.entity"
import { Search } from "../../entities/sql/search.entity"
import { SearchSummaryFieldsType } from "../../enums/search-summary-fields-types.enum"

const get = async (
  search: Search,
  searchType: SearchSummaryFieldsType
): Promise<SearchSummaryFields> => {
  const existingSearchItem = await dataSource.manager
    .getRepository(SearchSummaryFields)
    .findOne({ where: { searchType, search } })
  return existingSearchItem
}

const upsert = async (
  search: SearchSummaryFields
): Promise<SearchSummaryFields | null> => {
  try {
    return await dataSource.manager
      .getRepository(SearchSummaryFields)
      .save(search)
  } catch (e) {
    console.log("Search Summary already exist")
    return null
  }
}

export default { get, upsert }
