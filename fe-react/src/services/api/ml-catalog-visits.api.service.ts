import { CatalogVisitsResponse } from "../../models/dto/CatalogApiVisitResponse.model"

interface FetchCatalogParam {
  userId: string
  catalogId: string
}
export const fetchCatalogVisitsInformation = async ({
  userId,
  catalogId,
}: FetchCatalogParam): Promise<CatalogVisitsResponse> => {
  const res = await fetch(
    `${process.env.REACT_APP_ML_DATA}/ml/catalog/views?catalogId=${catalogId}&userId=${userId}`
  )
  return res.json()
}
