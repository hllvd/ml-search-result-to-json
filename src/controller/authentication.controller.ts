import { Request, Response } from "express"
import { setAppConfig } from "../repository/app-config.repository"
import mlService from "../services/ml"

const authentication = async (req: Request, res: Response) => {
  const code = req.query?.code.toString()
  const { access_token, user_id } = await mlService.authentication(code)
  console.log(access_token, user_id)
  await setAppConfig({
    domain: user_id.toString(),
    key: "access_token",
    value: access_token,
  })
  res.status(200).json({ access_token, user_id })
}

const login = async (req: Request, res: Response) => {
  const mlLoginUrl = await mlService.loginUrl()
  res.redirect(mlLoginUrl.toString())
}

export default { authentication, login }
