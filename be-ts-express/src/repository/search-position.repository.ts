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
  searchPosition: SearchPosition | Array<SearchPosition>
): Promise<boolean> => {
  try {
    const arraySearchPosition = Array.isArray(searchPosition)
      ? searchPosition
      : [searchPosition]

    await dataSource.manager.upsert(
      SearchPosition,
      [...arraySearchPosition],
      ["search", "position", "product"]
    )
    return true
  } catch (e) {
    console.log("Search SearchPosition already exist", e)
    return false
  }
}

const del = async (search: Search): Promise<boolean> => {
  try {
    await dataSource.manager
      .getRepository(SearchPosition)
      .delete({ search: { id: search.id } })
    return true
  } catch (e) {
    console.log("Search SearchPosition already exist", e)
    return false
  }
}

export default { upsert, del }
