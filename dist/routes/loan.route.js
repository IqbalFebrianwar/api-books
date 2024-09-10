"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loan_controller_1 = require("../controllers/loan.controller");
const router = (0, express_1.Router)();
router.post('/loans', loan_controller_1.createLoans);
exports.default = router;
