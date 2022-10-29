import { Model as DBModel } from "../models/model.js";
import express from "express";

type req = express.Request;
type res = express.Response;

export class Controller {
    table: string;
    model: DBModel;
    constructor(table: string) {
        this.table = table;
        this.model = new DBModel();
    }

    insertData (req: req, res: res) {
        if (!req.body?.content) {
            res.sendStatus(400);
            return;
        }
        const dataColumn = Object.keys(req.body.content);
        const inputValues = Object.values(req.body.content);


        this.model.insertToDB(this.table, dataColumn, inputValues, res);


    }

    getAllData (req: req, res: res)  {
        this.model.getAllFromDB(this.table, res);
    }

    deleteAllData (req: req, res: res) {
        this.model.removeAllFromDB(this.table, res);
    }

    modifyDataById (req: req, res: res) {
        if (!req.body?.content) {
            res.sendStatus(400);
            return;
        }
        let updateValues: string = "";
        let updateArray: string[] = [];
        for (let key in req.body.content) {
            if (typeof req.body.content[key] == "number"){
                updateArray.push(`${key} = ${req.body.content[key]} `);
            }
            else if (typeof req.body.content[key] == "string")
            updateArray.push(`${key} = '${req.body.content[key]}' `);
        }
        updateValues = updateArray.join(" , ");


        this.model.modifyDB(this.table, updateValues, +req.params.id, res);


    }

    deleteDataById (req: req, res: res) {
        this.model.deleteFromDBById(this.table, +req.params.id, res);
    }

    getDataById (req: req, res: res) {
        const rows: any = this.model.getDataFromDBById(this.table, +req.params.id, res);
    }

    getMonthData (req: req, res: res) {
        if (!req.body?.payMonth) {
            res.sendStatus(400);
            return;
        }

        this.model.getMonthDataFromDB (this.table, +req.params.paymonth, res);
    }
    
}