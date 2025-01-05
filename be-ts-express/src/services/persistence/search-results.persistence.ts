import { SearchPosition } from "../../entities/sql/search-positions.entity"
import { Search } from "../../entities/sql/search.entity"
import { SearchResultApiResponse } from "../../models/api-response/api/search-results-response.models"
import searchPositionRepository from "../../repository/search-position.repository"
import searchRepository from "../../repository/search.repository"

const saveSearchResultToDb = async (
  searchResultsInfo: SearchResultApiResponse
) => {
  const { searchTerm = null, items = null, url = null } = searchResultsInfo
  const search = new Search()
  search.searchTerm = searchTerm
  search.url = url
  const result = await searchRepository.upsert(search)

  //   const searchResult = new SearchPosition()
  //   searchResult.position = 1
  //   searchResult.productId = "122"
  //   searchResult.searchId = 3

  //   const searchResult2 = new SearchPosition()
  //   searchResult.position = 1
  //   searchResult.productId = "122"
  //   searchResult.searchId = 3

  //   await searchPositionRepository.upsert([searchResult, searchResult2])

  console.log("save console", result)
}

export { saveSearchResultToDb }
