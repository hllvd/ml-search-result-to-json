import { Request, Response } from "express"
import { getProductVisitsSummary } from "../services/ml/products-visits.service"
import { getProductComplete } from "../services/ml/products.service"

const product = async (req: Request, res: Response) => {
  try {
    const productId = req.query?.productId?.toString()
    const userId = req.query?.userId?.toString() ?? "1231084821"

    const productInfo = await getProductComplete({
      productId,
      userId,
    })

    res.status(200).json({
      productId,
      ...productInfo,
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

const views = async (req: Request, res: Response) => {
  try {
    const productId = req.query?.productId?.toString()
    const userId = req.query?.userId?.toString() ?? "1231084821"

    const catalogVisitsSummary = await getProductVisitsSummary({
      userId,
      productId,
    })
    res.status(200).json({
      ...catalogVisitsSummary,
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

export default { product, views }
