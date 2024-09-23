import { RequestExtended } from "../models/extends/params/request-custom.model"
import {
  saveCatalogToDb,
  saveProductToDb,
} from "../services/persistence/product-catalog.persistence"

const persistentMiddleware = async (req: RequestExtended) => {
  const { productInfo = null, catalogInfo = null } = req.persistency || {}
  if (productInfo == null && catalogInfo == null) return null
  if (productInfo) saveProductToDb(productInfo)
  if (catalogInfo) saveCatalogToDb(catalogInfo)
  try {
  } catch (e) {
    console.log(e)
  }
}

export { persistentMiddleware }
