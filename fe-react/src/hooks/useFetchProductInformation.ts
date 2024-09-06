import { useQuery } from "react-query"
import { ProductResponse } from "../models/dto/ProductApiResponse.model"
import { fetchProductInformation } from "../services/api/MlProduct.api.service"

export default function useFetchProductInformation(productId: string) {
  const queryResponse = useQuery<ProductResponse>(
    ["productInformationFetcher", { userId: "1231084821", productId }],
    () =>
      fetchProductInformation({
        userId: "1231084821",
        catalogId: productId,
      }),
    { enabled: false }
  )

  return queryResponse
}
