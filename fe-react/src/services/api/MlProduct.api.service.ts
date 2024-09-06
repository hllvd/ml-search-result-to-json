import { ProductResponse } from "../../models/dto/ProductApiResponse.model"

interface FetchProductParam {
  userId: string
  catalogId: string
}
export const fetchProductInformation = async ({
  userId,
  catalogId,
}: FetchProductParam): Promise<ProductResponse> => {
  const res = await fetch(
    `${process.env.REACT_APP_ML_DATA}/ml/product?productId=${catalogId}&userId=${userId}`
  )
  return res.json()
}
