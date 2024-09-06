import { useQuery } from "react-query"
import { CatalogVisitsResponse } from "../models/dto/CatalogApiVisitResponse.model"
import { fetchCatalogVisitsInformation } from "../services/api/MlCatalogVisits.api.service"
import { fetchProductVisitsInformation } from "../services/api/MlProductVisits.api.service"

export default function useFetchProductVisitsInformation(productId: string) {
  const queryResponse = useQuery<CatalogVisitsResponse>(
    ["productVisitsFetcher", { userId: "1231084821", productId }],
    () =>
      fetchProductVisitsInformation({
        userId: "1231084821",
        productId,
      }),
    { enabled: !!productId }
  )

  return queryResponse
}
