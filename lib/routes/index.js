"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_controller_1 = require("../controller/authentication.controller");
const ml_route_1 = require("./ml.route");
const router = (0, express_1.Router)();
router.get("/login", authentication_controller_1.default.login);
router.get("/redirect", authentication_controller_1.default.authentication);
router.use("/ml", ml_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map