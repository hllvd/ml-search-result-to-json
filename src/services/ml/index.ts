import { httpPost } from "../httpLayer/fetch-ml.httpLayer"
import "dotenv/config"
import { OauthTokenModel } from "../../models/authentication.model"
import {
  ML_REDIRECT_URI,
  ML_CLIENT_ID,
  ML_CLIENT_SECRET,
} from "../../constants"

const authUrl: string = "https://api.mercadolibre.com/oauth/token"
const authorizationBaseUrl = "https://auth.mercadolivre.com.br/authorization"

const payload = {
  grant_type: "authorization_code",
  client_id: ML_CLIENT_ID,
  client_secret: ML_CLIENT_SECRET,
  code: "",
  redirect_uri: ML_REDIRECT_URI,
}
const searchParams = {
  response_type: "code",
  client_id: ML_CLIENT_ID,
  redirect_uri: ML_REDIRECT_URI,
}
/**
 * -d 'grant_type=authorization_code' \
-d 'client_id=$APP_ID' \
-d 'client_secret=$SECRET_KEY' \
-d 'code=$SERVER_GENERATED_AUTHORIZATION_CODE' \
-d 'redirect_uri=$REDIRECT_URI' \
 */
const authentication = async (code: string): Promise<any> => {
  payload.code = code
  const r = await httpPost<OauthTokenModel>(authUrl, payload)
  return r
}

const loginUrl = () => {
  const url = new URL(authorizationBaseUrl)
  Object.entries(searchParams).forEach(([key, value]) => {
    console.log(key, value)
    url.searchParams.append(key, value)
  })
  return url
}

export default { authentication, loginUrl }
