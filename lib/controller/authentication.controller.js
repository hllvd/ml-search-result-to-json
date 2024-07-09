"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_config_entity_1 = require("../entities/app-config.entity");
const ml_1 = require("../services/ml");
const authentication = async (req, res) => {
    const { code } = req.query;
    console.log(code);
    const { access_token, user_id } = await ml_1.default.authentication(code.toString());
    // await setAppConfig({
    //   domain: user_id,
    //   key: "ml_code",
    //   value: code.toString(),
    // })
    await app_config_entity_1.appConfigRepository
        .create({
        clientId: "2",
        configKey: "2",
        configValue: "2",
    })
        .go();
    res.status(200).json({ access_token });
};
const login = async (req, res) => {
    const mlLoginUrl = await ml_1.default.loginUrl();
    res.redirect(mlLoginUrl.toString());
};
exports.default = { authentication, login };
//# sourceMappingURL=authentication.controller.js.map