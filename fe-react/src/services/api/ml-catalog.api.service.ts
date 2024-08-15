import { CatalogInformationResponse } from "../../models/dto/catalog-api-response.model"

interface FetchCatalogParam {
  userId: string
  catalogId: string
}
export const fetchCatalogInformation = async ({
  userId,
  catalogId,
}: FetchCatalogParam): Promise<CatalogInformationResponse> => {
  const res = await fetch(
    `https://localhost:3333/ml/catalog?catalogId=${catalogId}&userId=${userId}`
  )
  return res.json()
}
