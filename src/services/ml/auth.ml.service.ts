import { httpPost } from "../httpLayer/fetch-ml.httpLayer"
import "dotenv/config"
import { OAuthTokenResponse } from "../../models/authentication.model"
import {
  ML_REDIRECT_URI,
  ML_CLIENT_ID,
  ML_CLIENT_SECRET,
} from "../../constants"
import { setAppConfig } from "../../repository/app-config.repository"

const authUrl: string = "https://api.mercadolibre.com/oauth/token"
const authorizationBaseUrl = "https://auth.mercadolivre.com.br/authorization"

const payloadCommon = {
  client_id: ML_CLIENT_ID,
  client_secret: ML_CLIENT_SECRET,
}
const payloadAuthToken = {
  grant_type: "authorization_code",
  ...payloadCommon,
  code: "",
  redirect_uri: ML_REDIRECT_URI,
}

const payloadRefreshToken = {
  grant_type: "refresh_token",
  ...payloadCommon,
  refresh_token: "",
}
const searchParams = {
  response_type: "code",
  client_id: ML_CLIENT_ID,
  redirect_uri: ML_REDIRECT_URI,
}
const authentication = async (code: string): Promise<OAuthTokenResponse> => {
  payloadAuthToken.code = code
  const { user_id, access_token, refresh_token } =
    await httpPost<OAuthTokenResponse>(authUrl, payloadAuthToken)

  const domain = user_id.toString()
  await setAppConfig({
    domain,
    key: "access_token",
    value: access_token,
  })
  await setAppConfig({
    domain,
    key: "refresh_token",
    value: refresh_token,
  })
  await setAppConfig({
    domain,
    key: "refresh_token_ttl",
    value: 1,
  })
  return { user_id, access_token, refresh_token }
}

const reAuthentication = async (code: string): Promise<OAuthTokenResponse> => {
  payloadRefreshToken.refresh_token = code
  const { user_id, access_token, refresh_token } =
    await httpPost<OAuthTokenResponse>(authUrl, payloadRefreshToken)

  const domain = user_id.toString()
  await setAppConfig({
    domain,
    key: "access_token",
    value: access_token,
  })
  await setAppConfig({
    domain,
    key: "refresh_token",
    value: refresh_token,
  })
  await setAppConfig({
    domain,
    key: "refresh_token_ttl",
    value: 1,
  })

  return { user_id, access_token, refresh_token }
}

const loginUrl = () => {
  const url = new URL(authorizationBaseUrl)
  Object.entries(searchParams).forEach(([key, value]) => {
    console.log(key, value)
    url.searchParams.append(key, value)
  })
  return url
}

export default { authentication, loginUrl, reAuthentication }
