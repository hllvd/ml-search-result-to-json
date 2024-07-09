"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ml_controller_1 = require("../controller/ml.controller");
const router = (0, express_1.Router)();
router.get("/log-search-result", ml_controller_1.default.logSearchResult);
exports.default = router;
//# sourceMappingURL=ml.route.js.map