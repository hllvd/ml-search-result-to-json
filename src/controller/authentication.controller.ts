import { Request, Response } from "express"
import mlAuthService from "../services/ml/auth.ml.service"

const authentication = async (req: Request, res: Response) => {
  const code = req.query?.code.toString()
  const { access_token, user_id, refresh_token } =
    await mlAuthService.authentication(code)
  res.status(204).json({ access_token, user_id, refresh_token })
}

const login = async (req: Request, res: Response) => {
  const mlLoginUrl = await mlAuthService.loginUrl()
  res.redirect(mlLoginUrl.toString())
}

export default { authentication, login }
