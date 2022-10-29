"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expendRouter = void 0;
const express_1 = __importDefault(require("express"));
const expendController_js_1 = require("../controllers/expendController.js");
exports.expendRouter = express_1.default.Router();
exports.expendRouter.post('/', expendController_js_1.api.insertData);
exports.expendRouter.get('/', expendController_js_1.api.getAllData); // 삭제?
exports.expendRouter.delete("/id/:id", expendController_js_1.api.deleteDataById);
exports.expendRouter.put("/id/:id", expendController_js_1.api.modifyDataById);
exports.expendRouter.get("/id/:id", expendController_js_1.api.getDataById);
// expendRouter.get("/payyear/:payyear", expendController.getYearData); //
exports.expendRouter.get("/paymonth/:paymonth", expendController_js_1.api.getMonthData); //
// expendRouter.get("/payday/:payday", expendController.getDayData); //
