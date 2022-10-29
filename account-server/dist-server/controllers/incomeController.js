"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const commonAPI_js_1 = require("./commonAPI.js");
const incomeGetApi = new commonAPI_js_1.Controller("income");
exports.api = {
    insertData: (req, res) => { incomeGetApi.insertData(req, res); },
    getAllData: (req, res) => { incomeGetApi.getAllData(req, res); },
    deleteAllData: (req, res) => { incomeGetApi.deleteAllData(req, res); },
    modifyDataById: (req, res) => { incomeGetApi.modifyDataById(req, res); },
    deleteDataById: (req, res) => { incomeGetApi.deleteDataById(req, res); },
    getDataById: (req, res) => { incomeGetApi.getDataById(req, res); },
    // getYearData: (req: req, res: res) => { incomeGetApi.getYearData(req, res) },
    getMonthData: (req, res) => { incomeGetApi.getMonthData(req, res); },
    // getDayData: (req: req, res: res) => { incomeGetApi.getDayData(req, res) }
};
