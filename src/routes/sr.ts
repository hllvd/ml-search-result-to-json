import { Router } from "express"
import helloWorldController from "../controller/search-result.controller"

const router = Router()

router.get("/", helloWorldController.searchResult)

export default router
