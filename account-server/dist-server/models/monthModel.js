"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monthModel = void 0;
const db_js_1 = require("../config/db.js");
class monthModel {
    constructor() {
        this.connection = db_js_1.connectionCreated;
    }
    getUnionQuery(payYear, payMonth, res) {
        this.connection.query(`(select id, payedMoney, payYear, payMonth, payDay, payTime, '수입' as classify, category, memo
                from income
                where payYear = ?
                and payMonth =  ?
                UNION
                select id, payedMoney, payYear, payMonth, payDay, payTime, '지출' as classify, category, memo
                from expend
                where payYear = ?
                and payMonth = ?
                order by payDay, payTime asc
            );
            `, [payYear, payMonth, payYear, payMonth], (err, rows) => {
            if (err) {
                throw err;
            }
            res.send(rows);
        });
    }
}
exports.monthModel = monthModel;
