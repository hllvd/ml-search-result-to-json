import { RequestExtended } from "../models/extends/params/request-custom.model"
import {
  saveCatalogToDb,
  saveProductToDb,
} from "../services/persistence/product-catalog.persistence"
import { saveCatalogViewsDb } from "../services/persistence/views.persistence"

const persistentMiddleware = async (req: RequestExtended) => {
  const {
    productInfo = null,
    catalogInfo = null,
    catalogViewsInfo = null,
  } = req.persistency || {}

  if (productInfo == null && catalogInfo == null && catalogViewsInfo == null)
    return null
  if (productInfo) saveProductToDb(productInfo)
  if (catalogInfo) saveCatalogToDb(catalogInfo)
  if (catalogViewsInfo) saveCatalogViewsDb(catalogViewsInfo)
  try {
  } catch (e) {
    console.log(e)
  }
}

export { persistentMiddleware }
