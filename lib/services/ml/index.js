"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_ml_httpLayer_1 = require("../httpLayer/fetch-ml.httpLayer");
require("dotenv/config");
require("dotenv").config();
const authUrl = "https://api.mercadolibre.com/oauth/token";
const authorizationBaseUrl = "https://auth.mercadolivre.com.br/authorization";
const { ML_REDIRECT_URI, ML_CLIENT_ID, ML_CLIENT_SECRET } = process.env;
const payload = {
    grant_type: "authorization_code",
    client_id: ML_CLIENT_ID,
    client_secret: ML_CLIENT_SECRET,
    code: "",
    redirect_uri: ML_REDIRECT_URI,
};
const searchParams = {
    response_type: "code",
    client_id: ML_CLIENT_ID,
    redirect_uri: ML_REDIRECT_URI,
};
/**
 * -d 'grant_type=authorization_code' \
-d 'client_id=$APP_ID' \
-d 'client_secret=$SECRET_KEY' \
-d 'code=$SERVER_GENERATED_AUTHORIZATION_CODE' \
-d 'redirect_uri=$REDIRECT_URI' \
 */
const authentication = async (code) => {
    payload.code = code;
    return await (0, fetch_ml_httpLayer_1.httpPost)(authUrl, payload);
};
const loginUrl = () => {
    const url = new URL(authorizationBaseUrl);
    Object.entries(searchParams).forEach(([key, value]) => {
        console.log(key, value);
        url.searchParams.append(key, value);
    });
    return url;
};
exports.default = { authentication, loginUrl };
//# sourceMappingURL=index.js.map