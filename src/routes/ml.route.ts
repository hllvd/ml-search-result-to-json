import { Router } from "express"
import mlController from "../controller/ml.controller"

const router = Router()

router.get("/log-search-result", mlController.logSearchResult)
router.get("/me", mlController.me)
router.get("/notification", mlController.notification)

export default router
