import dataSource from "../db/data-source"
import { SearchPosition } from "../entities/sql/search-positions.entity"
import { Search } from "../entities/sql/search.entity"
import searchRepository from "./search.repository"

// const get = async (searchTerm: string): Promise<SearchPosition> => {
//   const existingSearchItem = await dataSource.manager
//     .getRepository(SearchPosition)
//     .findOne({ where: { searchTerm: searchTerm } })
//   return existingSearchItem
// }

const upsert = async (
  searchTerm: string,
  search: SearchPosition
): Promise<SearchPosition | Array<SearchPosition> | null> => {
  try {
    const arraySearch = Array.isArray(search) ? search : [search]
    console.log("Search SearchPosition", arraySearch)
    return await dataSource.manager.getRepository(SearchPosition).save(search)
  } catch (e) {
    console.log("Search SearchPosition already exist", e)
    return null
  } finally {
    console.log("Search SearchPosition finally")
  }
}

export default { upsert }
