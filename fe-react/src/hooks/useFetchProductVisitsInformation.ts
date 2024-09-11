import { useQuery } from "react-query"
import { ProductVisitsResponse } from "../models/dto/ProductApiVisitResponse.model"
import { fetchProductVisitsInformation } from "../services/api/MlProductVisits.api.service"

export default function useFetchProductVisitsInformation(productId: string) {
  const queryResponse = useQuery<ProductVisitsResponse>(
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
