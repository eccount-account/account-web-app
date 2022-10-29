"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.monthTotalRouter = void 0;
const express_1 = __importDefault(require("express"));
const monthTotalController_js_1 = require("../controllers/monthTotalController.js");
exports.monthTotalRouter = express_1.default.Router();
const monthController = new monthTotalController_js_1.monthTotalController();
exports.monthTotalRouter.post('/', monthController.getAllData);
