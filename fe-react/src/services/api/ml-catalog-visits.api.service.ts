import { CatalogInformationResponse } from "../../models/dto/CatalogApiResponse.model"

interface FetchCatalogParam {
  userId: string
  catalogId: string
}
export const fetchCatalogVisitsInformation = async ({
  userId,
  catalogId,
}: FetchCatalogParam): Promise<CatalogInformationResponse> => {
  const res = await fetch(
    `${process.env.REACT_APP_ML_DATA}/ml/catalog/visits?catalogId=${catalogId}&userId=${userId}`
  )
  return res.json()
}
