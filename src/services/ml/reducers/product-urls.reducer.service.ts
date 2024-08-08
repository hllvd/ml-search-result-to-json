import { ProductId } from "../../../models/dto/ml-product.models"

export const productIdsReducer = (productIds: Array<ProductId>) => {
  const productIdStrs = productIds.reduce((acc, curr, i) => {
    const isLast = i === productIds.length - 1
    const divider = Math.trunc(i / 20)
    if (!acc[divider]) acc[divider] = []
    acc[divider].push(curr)
    return acc
  }, [])

  return productIdStrs
}
