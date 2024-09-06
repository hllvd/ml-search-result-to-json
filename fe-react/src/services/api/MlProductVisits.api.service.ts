import { ProductVisitsResponse } from "../../models/dto/ProductApiVisitResponse.model"

interface FetchCatalogParam {
  userId: string
  productId: string
}
export const fetchProductVisitsInformation = async ({
  userId,
  productId,
}: FetchCatalogParam): Promise<ProductVisitsResponse> => {
  const res = await fetch(
    `${process.env.REACT_APP_ML_DATA}/ml/product/views?productId=${productId}&userId=${userId}`
  )
  return res.json()
}
