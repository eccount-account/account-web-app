"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.incomeRouter = void 0;
const express_1 = __importDefault(require("express"));
const incomeController_js_1 = require("../controllers/incomeController.js");
exports.incomeRouter = express_1.default.Router();
exports.incomeRouter.post('/', incomeController_js_1.api.insertData);
exports.incomeRouter.get('/', incomeController_js_1.api.getAllData);
exports.incomeRouter.delete('/', incomeController_js_1.api.deleteAllData);
exports.incomeRouter.put("/id/:id", incomeController_js_1.api.modifyDataById);
exports.incomeRouter.delete("/id/:id", incomeController_js_1.api.deleteDataById);
exports.incomeRouter.get("/id/:id", incomeController_js_1.api.getDataById);
exports.incomeRouter.get("/paymonth/:paymonth", incomeController_js_1.api.getMonthData);
