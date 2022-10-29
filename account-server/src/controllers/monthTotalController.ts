import { monthModel } from "../models/monthModel";
import express from "express";

type req = express.Request;
type res = express.Response;

export class monthTotalController {
    model : monthModel;
    constructor() { 
        this.model = new monthModel();
    }

    getAllData = (req: req, res: res) => {
        if (!req.body?.content) {
            res.sendStatus(400);
            return;
        }
        
        let payYear;
        let payMonth;

        for (let key in req.body.content) {
            if (key == "payYear") {
                payYear = req.body.content[key];
            } else if (key == "payMonth") {
                payMonth = req.body.content[key];
            }
        }

        try {
            this.model.getUnionQuery(payYear, payMonth, res);
        } catch {
            res.sendStatus(400);
        }
        
    }
}