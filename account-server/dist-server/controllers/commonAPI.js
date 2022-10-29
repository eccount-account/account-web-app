"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const model_js_1 = require("../models/model.js");
class Controller {
    constructor(table) {
        this.table = table;
        this.model = new model_js_1.Model();
    }
    insertData(req, res) {
        var _a;
        if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.content)) {
            res.sendStatus(400);
            return;
        }
        const dataColumn = Object.keys(req.body.content);
        const inputValues = Object.values(req.body.content);
        this.model.insertToDB(this.table, dataColumn, inputValues, res);
    }
    getAllData(req, res) {
        this.model.getAllFromDB(this.table, res);
    }
    deleteAllData(req, res) {
        this.model.removeAllFromDB(this.table, res);
    }
    modifyDataById(req, res) {
        var _a;
        if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.content)) {
            res.sendStatus(400);
            return;
        }
        let updateValues = "";
        let updateArray = [];
        for (let key in req.body.content) {
            if (typeof req.body.content[key] == "number") {
                updateArray.push(`${key} = ${req.body.content[key]} `);
            }
            else if (typeof req.body.content[key] == "string")
                updateArray.push(`${key} = '${req.body.content[key]}' `);
        }
        updateValues = updateArray.join(" , ");
        this.model.modifyDB(this.table, updateValues, +req.params.id, res);
    }
    deleteDataById(req, res) {
        this.model.deleteFromDBById(this.table, +req.params.id, res);
    }
    getDataById(req, res) {
        const rows = this.model.getDataFromDBById(this.table, +req.params.id, res);
    }
    getMonthData(req, res) {
        var _a;
        if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.payMonth)) {
            res.sendStatus(400);
            return;
        }
        this.model.getMonthDataFromDB(this.table, +req.params.paymonth, res);
    }
}
exports.Controller = Controller;
