import { NextFunction, Response } from "express"
import {
  PersistencyInfo,
  RequestExtended,
} from "../models/extends/params/request-custom.model"

import { getProductVisitsSummary } from "../services/ml/products-visits.service"
import { getProductComplete } from "../services/ml/products.service"

const product = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction
) => {
  const productId = req.query?.productId?.toString()
  const userId = req.query?.userId?.toString() ?? "1231084821"

  const productInfo = await getProductComplete({
    productId,
    userId,
  })

  req.persistency = {} as PersistencyInfo
  req.persistency.productInfo = { ...productInfo, productId }
  next()
  console.log("GO NEXT from product controller")
}

const views = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction
) => {
  const productId = req.query?.productId?.toString()
  const userId = req.query?.userId?.toString() ?? "1231084821"

  const catalogVisitsSummary = await getProductVisitsSummary({
    userId,
    productId,
  })

  if (!req.persistency) {
    req.persistency = {} as PersistencyInfo
    req.persistency.productViewInfo = { ...catalogVisitsSummary, productId }
    next()
  }
}

export default { product, views }
