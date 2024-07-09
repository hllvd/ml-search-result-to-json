import { Router } from "express"
import mlController from "../controller/ml.controller"

const router = Router()

router.get("/log-search-result", mlController.logSearchResult)

export default router
