import dataSource from "../../db/data-source"
import { Search } from "../../entities/sql/search.entity"

const get = async (searchTerm: string): Promise<Search> => {
  const existingSearchItem = await dataSource.manager
    .getRepository(Search)
    .findOne({ where: { searchTerm: searchTerm } })
  return existingSearchItem
}

const upsert = async (search: Search): Promise<boolean> => {
  try {
    await dataSource.manager.getRepository(Search).save(search)
    return true
  } catch (e) {
    console.log("Search Summary already exist")
    return false
  }
}

export default { get, upsert }
