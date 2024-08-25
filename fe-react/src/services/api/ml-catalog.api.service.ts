import { CatalogInformationResponse } from "../../models/dto/CatalogApiResponse.model"

interface FetchCatalogParam {
  userId: string
  catalogId: string
}
export const fetchCatalogInformation = async ({
  userId,
  catalogId,
}: FetchCatalogParam): Promise<CatalogInformationResponse> => {
  console.log(process.env.REACT_APP_ML_DATA)
  const res = await fetch(
    `${process.env.REACT_APP_ML_DATA}/ml/catalog?catalogId=${catalogId}&userId=${userId}`
  )
  return res.json()
}
