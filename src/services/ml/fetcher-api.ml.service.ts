import { MY_USER_ID } from "../../constants"
import {
  getAppConfigValue,
  setAppConfig,
} from "../../repository/app-config.repository"
import { httpGet, httpPost } from "../httpLayer/fetch-ml.httpLayer"
import authMlService from "./auth.ml.service"

const base_url = "https://api.mercadolibre.com"
const fetchMl = async (url: string, options: any = {}) => {
  const userAccessToken = await _getAppConfigValueFromKey("access_token")

  const bearerTokenAuthorization = {
    Authorization: `Bearer ${userAccessToken}`,
  }
  const { data, method } = options
  try {
    const result =
      method === "POST" || data === null
        ? await httpPost(`${base_url}${url}`, data, bearerTokenAuthorization)
        : await httpGet(`${base_url}${url}`, bearerTokenAuthorization)
    setAppConfig({
      domain: MY_USER_ID,
      key: "refresh_token_ttl",
      value: 3,
    })
    return result
  } catch (e) {
    const refreshTokenTtl = await _getAppConfigValueFromKey("refresh_token_ttl")
    if ((refreshTokenTtl as number) < 1) return
    const refreshToken = await _getAppConfigValueFromKey("refresh_token")
    console.log("refreshTokenTtl", refreshTokenTtl)
    await authMlService.reAuthentication(refreshToken)
    return await fetchMl(url, options)
  }
}

const _getAppConfigValueFromKey = async (key: string) => {
  const value = await getAppConfigValue({
    domain: MY_USER_ID,
    key,
  })
  return value
}

export { fetchMl }
