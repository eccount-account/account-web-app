"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monthTotalController = void 0;
const monthModel_1 = require("../models/monthModel");
class monthTotalController {
    constructor() {
        this.getAllData = (req, res) => {
            var _a;
            if (!((_a = req.body) === null || _a === void 0 ? void 0 : _a.content)) {
                res.sendStatus(400);
                return;
            }
            let payYear;
            let payMonth;
            for (let key in req.body.content) {
                if (key == "payYear") {
                    payYear = req.body.content[key];
                }
                else if (key == "payMonth") {
                    payMonth = req.body.content[key];
                }
            }
            try {
                this.model.getUnionQuery(payYear, payMonth, res);
            }
            catch (_b) {
                res.sendStatus(400);
            }
        };
        this.model = new monthModel_1.monthModel();
    }
}
exports.monthTotalController = monthTotalController;
