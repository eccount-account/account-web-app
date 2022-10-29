"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const db_js_1 = require("../config/db.js");
class Model {
    constructor() {
        this.connection = db_js_1.connectionCreated;
    }
    insertToDB(table, dataColumn, inputValues, res) {
        this.connection.query(`insert into ${table}
            (${dataColumn.join(", ")})
            values (?) `, [inputValues], (err, rows) => {
            if (err) {
                throw err;
            }
            res.sendStatus(200);
        });
    }
    getAllFromDB(table, res) {
        const rows = this.connection.query(`select * from ${table} `, (err, rows) => {
            if (err) {
                throw err;
            }
            res.send(rows);
        });
    }
    removeAllFromDB(table, res) {
        this.connection.query(`delete * from ${table} `, (err, rows) => {
            if (err) {
                throw err;
            }
            res.sendStatus(200);
        });
    }
    modifyDB(table, updateValues, id, res) {
        this.connection.query(`update ${table} set ${updateValues} where id = ?`, [id], (err, rows) => {
            if (err) {
                throw err;
            }
            res.sendStatus(200);
        });
    }
    deleteFromDBById(table, id, res) {
        this.connection.query(`delete from ${table} where id = ? `, [id], (err, rows) => {
            if (err) {
                throw err;
            }
            res.sendStatus(200);
        });
    }
    getDataFromDBById(table, id, res) {
        this.connection.query(`select * from ${table} where id = ? `, [id], (err, rows) => {
            if (err) {
                throw err;
            }
            res.send(rows);
        });
    }
    getMonthDataFromDB(table, payMonth, res) {
        this.connection.query(`select * from ${table} where payMonth = ? `, [payMonth], (err, rows) => {
            if (err) {
                throw err;
            }
            res.sendStatus(200);
        });
    }
}
exports.Model = Model;
