import dataSource from "../db/data-source"
import { Search } from "../entities/sql/search.entity"

const get = async (searchTerm: string): Promise<Search> => {
  const existingSearchItem = await dataSource.manager
    .getRepository(Search)
    .createQueryBuilder("search")
    .leftJoinAndSelect("search.searchPosition", "SearchPosition IS NOT NULL")
    .where("search.searchTerm = :searchTerm", { searchTerm })
    .getOne()
  return existingSearchItem
}

const upsert = async (search: Search): Promise<Search | null> => {
  try {
    return await dataSource.manager.getRepository(Search).save(search)
  } catch (e) {
    console.log("Search  already exist")
    return null
  }
}

export default { get, upsert }
