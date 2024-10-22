import { Router } from "express"
import mlController from "../controller/ml.controller"
import mlProductController from "../controller/product.controller"
import mlCatalogController from "../controller/catalog.controller"
import mlCategoriesController from "../controller/categories.controller"

const router = Router()

router.get("/log-search-result", mlController.logSearchResult)
router.get("/me", mlController.me)
router.get("/catalog", mlCatalogController.catalog)
router.get("/catalog/views", mlCatalogController.views)
router.get("/product", mlProductController.product)
router.get("/product/views", mlProductController.views)
router.get("/categories", mlCategoriesController.children)
router.get("/categories/items", mlCategoriesController.items)
router.get("/test", mlController.test)

export default router
