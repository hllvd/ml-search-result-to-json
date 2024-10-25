import { NextFunction, Response } from "express"
import { RequestExtended } from "../models/extends/params/request-custom.model"
import {
  getCategories,
  getPersistentCategoryInfo,
} from "../services/ml/categories.service"

const item = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction
) => {
  const categoryId = req.query?.categoryId?.toString()
  const userId = req.query?.userId?.toString() ?? "1231084821"
  if (!categoryId) {
    const childrenCats = await getCategories({ userId })
    return res.status(400).json([...childrenCats])
  }
  const listOfCats = await getPersistentCategoryInfo({ categoryId, userId })
  console.log("listOfCats", listOfCats)
  res.status(200).json({ ...listOfCats })
}

export default { item }
