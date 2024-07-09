"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfigRepository = void 0;
const dynamodb_1 = require("aws-sdk/clients/dynamodb");
const electrodb_1 = require("electrodb");
require("dotenv/config");
require("dotenv").config();
const dynamoDBClient = new dynamodb_1.default.DocumentClient({
    region: "sa-east-1",
    credentials: {
        accessKeyId: "BM72zcwrSIrMNMeosbOSFVZTRLJpKJBh7IgQ85yrq7NPaw5xYio2CfeQdNcGr1LG",
        secretAccessKey: "NWNsT18fR3zbIlem6oULFNwrpO8rDoFU2XGk5SrbyxbUrJpkaIkWY187GK6cmlWR",
    },
});
// highlight-next-line
const table = "app-config";
exports.appConfigRepository = new electrodb_1.Entity({
    model: {
        entity: "appconfig",
        version: "1",
        service: "config",
    },
    attributes: {
        clientId: {
            type: "string",
            required: true,
        },
        configKey: {
            type: "string",
            required: true,
        },
        configValue: {
            type: "string",
        },
    },
    indexes: {
        byClientId: {
            pk: {
                field: "PK",
                composite: ["clientId"],
            },
            sk: {
                field: "SK",
                composite: ["configKey"],
            },
        },
    },
}, { client: dynamoDBClient, table });
//# sourceMappingURL=app-config.entity.js.map