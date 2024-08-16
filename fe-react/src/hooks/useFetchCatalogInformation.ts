import { useQuery } from "react-query"
import { CatalogInformationResponse } from "../models/dto/CatalogApiResponse.model"
import { fetchCatalogInformation } from "../services/api/ml-catalog.api.service"

export default function useFetchCatalogInformation(catalogId: string) {
  const queryResponse = useQuery<CatalogInformationResponse>(
    [
      "catalogInformationFetcher",
      { userId: "1231084821", catalogId: "MLB25575176" },
    ],
    () =>
      fetchCatalogInformation({
        userId: "1231084821",
        catalogId: "MLB25575176",
      })
  )

  return queryResponse
}
