"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = require("./routes");
require("reflect-metadata");
const https_1 = require("https");
const fs_1 = require("fs");
const path_1 = require("path");
var env = process.env.NODE_ENV || "development";
// Load your SSL certificate and private key
// Install https local certificate https://support.apple.com/en-gb/guide/keychain-access/kyca2431/mac
const privateKey = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "ssl", "localhost-server.key"), "utf8");
const certificate = fs_1.default.readFileSync(path_1.default.join(__dirname, "..", "ssl", "localhost-server.crt"), "utf8");
const credentials = env == "development"
    ? {
        key: privateKey,
        cert: certificate,
    }
    : null;
const app = (0, express_1.default)();
const httpsServer = https_1.default.createServer(credentials, app);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(encodeValidation);
app.use("/", routes_1.default);
function encodeValidation(req, _res, next) {
    const contentType = req.get("content-type");
    const isPost = req.method === "POST";
    if (isPost && !(contentType === null || contentType === void 0 ? void 0 : contentType.includes("application/json")))
        throw "Content-Type must be application/json";
    next();
}
httpsServer.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`);
});
//# sourceMappingURL=app.js.map