import { Router } from "express"
import authenticationController from "../controller/authentication.controller"
import mlRoute from "./ml.route"

const router = Router()

router.get("/login", authenticationController.login)
router.get("/redirect", authenticationController.authentication)
router.use("/ml", mlRoute)

export default router
