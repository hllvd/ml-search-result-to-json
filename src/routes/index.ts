import { Router } from "express"
import searchResult from "./sr"

const router = Router()

router.use("/ml-search-result", searchResult)

export default router
