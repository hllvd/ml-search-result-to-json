import { Request, Response } from "express"
import { getProductVisitsSummary } from "../services/ml/products-visits.service"
import { getProductWithItsSeller } from "../services/ml/products.service"

const product = async (req: Request, res: Response) => {
  const productId = req.query?.productId?.toString()
  const userId = req.query?.userId?.toString() ?? "1231084821"

  const productInfo = await getProductWithItsSeller({
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
