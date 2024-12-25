import { NextFunction, Response } from "express"
import { RequestExtended } from "../models/extends/params/request-custom.model"
import productCatalogPersistence from "../services/persistence/product-catalog.persistence"

const entityFromDbMiddleware = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction
) => {
  const productId =
    req.query?.productId?.toString() ?? req.query.catalogId?.toString()

  const productCatalogFromDb = await productCatalogPersistence.get(productId)
  const daysToExpire = 30
  const expireDate: Date = productCatalogFromDb.metadataUpdatedAt
    ? new Date(productCatalogFromDb.metadataUpdatedAt)
    : new Date("1988-05-02")
  expireDate.setDate(expireDate.getDate() + daysToExpire)
  expireDate > new Date()
    ? res.status(200).json({ ...productCatalogFromDb })
    : next()
}
export { entityFromDbMiddleware }
