import { MY_USER_ID } from "../../constants"
import { getAppConfigValue } from "../../repository/app-config.repository"
import { httpGet, httpPost } from "../httpLayer/fetch-ml.httpLayer"
import authMlService from "./auth.ml.service"

const base_url = "https://api.mercadolibre.com"
const fetchMl = async (url: string, options: any = {}) => {
  const userAccessToken = await getAppConfigValue({
    domain: MY_USER_ID,
    key: "access_token",
  })

  const bearerTokenAuthorization = {
    Authorization: `Bearer ${userAccessToken}`,
  }
  const { data, method } = options
  try {
    return method === "POST" || data === null
      ? await httpPost(`${base_url}${url}`, data, bearerTokenAuthorization)
      : await httpGet(`${base_url}${url}`, bearerTokenAuthorization)
  } catch (e) {
    const refreshTokenTtl = await getAppConfigValue({
      domain: MY_USER_ID,
      key: "refresh_token_ttl",
    })
    const refreshToken = await getAppConfigValue({
      domain: MY_USER_ID,
      key: "refresh_token",
    })
    console.log("refreshTokenTtl", refreshTokenTtl)
    await authMlService.reAuthentication(refreshToken)
    if ((refreshTokenTtl as number) > 0) return await fetchMl(url, options)
  }
}

export { fetchMl }
