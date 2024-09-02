import { useQuery } from "react-query"
import { CatalogVisitsResponse } from "../models/dto/CatalogApiVisitResponse.model"
import { fetchCatalogVisitsInformation } from "../services/api/ml-catalog-visits.api.service"

export default function useFetchCatalogVisitsInformation(catalogId: string) {
  const queryResponse = useQuery<CatalogVisitsResponse>(
    [
      "catalogInformationFetcher",
      { userId: "1231084821", catalogId: catalogId },
    ],
    () =>
      fetchCatalogVisitsInformation({
        userId: "1231084821",
        catalogId: catalogId,
      }),
    { enabled: false }
  )

  return queryResponse
}
