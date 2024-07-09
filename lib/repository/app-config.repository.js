"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAppConfig = void 0;
const app_config_entity_1 = require("../entities/app-config.entity");
const setAppConfig = async ({ domain, key, value, }) => {
    await app_config_entity_1.appConfigRepository
        .create({
        clientId: domain,
        configKey: key,
        configValue: value,
    })
        .go();
};
exports.setAppConfig = setAppConfig;
//# sourceMappingURL=app-config.repository.js.map