import { Request, Response } from "express"
import { getAppConfig } from "../repository/app-config.repository"
import { getMe } from "../services/ml/api/me"
const me = async (req: Request, res: Response) => {
  const r = await getMe()
  console.log("r", r)
  res.status(200).json({ message: "Hello", ...r })
}

const notification = async (req: Request, res: Response) => {}

const logSearchResult = async (req: Request, res: Response) => {
  console.log("here")
  const r = "ok"
  res.status(200).json({ r })
}

export default { logSearchResult, me, notification }
