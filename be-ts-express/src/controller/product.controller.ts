import { Request, Response } from "express"
import { fetchProductItsSeller } from "../services/ml/api/search.api.service"
import { getProductVisitsSummary } from "../services/ml/products-visits.service"

const product = async (req: Request, res: Response) => {
  const productId = req.query?.productId?.toString()
  const userId = req.query?.userId?.toString() ?? "1231084821"

  const productInfo = await fetchProductItsSeller({
    productId,
    userId,
  })

  res.status(200).json({
    productId,
    ...productInfo,
  })
}

const views = async (req: Request, res: Response) => {
  const productId = req.query?.productId?.toString()
  const userId = req.query?.userId?.toString() ?? "1231084821"

  const catalogVisitsSummary = await getProductVisitsSummary({
    userId,
    productId,
  })
  res.status(200).json({
    ...catalogVisitsSummary,
  })
}

export default { product, views }
