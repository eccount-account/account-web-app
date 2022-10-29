"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const commonAPI_js_1 = require("./commonAPI.js");
const expendGetApi = new commonAPI_js_1.Controller("expend");
exports.api = {
    insertData: (req, res) => { expendGetApi.insertData(req, res); },
    getAllData: (req, res) => { expendGetApi.getAllData(req, res); },
    deleteAllData: (req, res) => { expendGetApi.deleteAllData(req, res); },
    modifyDataById: (req, res) => { expendGetApi.modifyDataById(req, res); },
    deleteDataById: (req, res) => { expendGetApi.deleteDataById(req, res); },
    getDataById: (req, res) => { expendGetApi.getDataById(req, res); },
    // getYearData: (req: req, res: res) => { expendGetApi.getYearData(req, res) },
    getMonthData: (req, res) => { expendGetApi.getMonthData(req, res); },
    // getDayData: (req: req, res: res) => { expendGetApi.getDayData(req, res) }
};
