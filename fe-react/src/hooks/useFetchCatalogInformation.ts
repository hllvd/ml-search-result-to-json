import { useQuery } from "react-query"
import { CatalogInformationResponse } from "../models/dto/CatalogApiResponse.model"
import { fetchCatalogInformation } from "../services/api/ml-catalog.api.service"

export default function useFetchCatalogInformation(catalogId: string) {
  const queryResponse = useQuery<CatalogInformationResponse>(
    [
      "catalogInformationFetcher",
      { userId: "1231084821", catalogId: catalogId },
    ],
    () =>
      fetchCatalogInformation({
        userId: "1231084821",
        catalogId: catalogId,
      }),
    { enabled: false }
  )

  return queryResponse
}
