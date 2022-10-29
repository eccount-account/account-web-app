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
        try {
            this.model.insertToDB(this.table, dataColumn, inputValues, res);
        }
        catch (err) {
            res.sendStatus(400);
        }
    }
    getAllData(req, res) {
        try {
            this.model.getAllFromDB(this.table, res);
        }
        catch (_a) {
            res.sendStatus(400);
        }
    }
    deleteAllData(req, res) {
        try {
            this.model.removeAllFromDB(this.table, res);
        }
        catch (_a) {
            res.sendStatus(400);
        }
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
            updateArray.push(`${key} = '${req.body.content[key]}' `);
        }
        updateValues = updateArray.join(" , ");
        try {
            this.model.modifyDB(this.table, updateValues, req.params.id, res);
        }
        catch (_b) {
            res.sendStatus(400);
        }
    }
    deleteDataById(req, res) {
        try {
            this.model.deleteFromDBById(this.table, req.params.id, res);
        }
        catch (_a) {
            res.sendStatus(400);
        }
    }
    getDataById(req, res) {
        try {
            const rows = this.model.getDataFromDBById(this.table, req.params.id, res);
        }
        catch (_a) {
            res.sendStatus(400);
        }
    }
    // getYearData (req: req, res: res) {
    //     connection.query(
    //         `select * from ${this.table} where payYear = ? `,
    //         [req.params.payyear],
    //         (err: any, rows: any) => {
    //             if (err) {
    //                 throw err;
    //             }
    //             res.send(rows);
    //         }
    //     );
    // }
    getMonthData(req, res) {
        var _a;
        if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.payMonth)) {
            res.sendStatus(400);
            return;
        }
        try {
            this.model.getMonthDataFromDB(this.table, +req.params.paymonth, res);
        }
        catch (_b) {
            res.sendStatus(400);
        }
        // getMonthDataFromDB
        // connection.query(
        //     `select * from ${this.table} where payMonth = ? `,
        //     [req.params.paymonth],
        //     (err: any, rows: any) => {
        //         if (err) {
        //             throw err;
        //         }
        //         res.send(rows);
        //     }
        // );
    }
}
exports.Controller = Controller;
