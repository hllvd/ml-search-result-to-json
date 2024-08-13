import { Router } from "express"
import mlController from "../controller/ml.controller"
import mlCatalogController from "../controller/catalog.controller"

const router = Router()

router.get("/log-search-result", mlController.logSearchResult)
router.get("/me", mlController.me)
router.get("/catalog", mlCatalogController.catalog)
router.get("/test", mlController.test)

export default router
