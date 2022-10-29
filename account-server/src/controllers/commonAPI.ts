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

        try {
            this.model.insertToDB(this.table, dataColumn, inputValues, res);
        } catch(err: any) {
            res.sendStatus(400);
        }

    }

    getAllData (req: req, res: res)  {
        try { 
            this.model.getAllFromDB(this.table, res);
        } catch {
            res.sendStatus(400);
        }

    }

    deleteAllData (req: req, res: res) {
        try {
            this.model.removeAllFromDB(this.table, res);
        } catch {
            res.sendStatus(400);
        }

    }

    modifyDataById (req: req, res: res) {
        if (!req.body?.content) {
            res.sendStatus(400);
            return;
        }
        let updateValues: string = "";
        let updateArray: string[] = [];
        for (let key in req.body.content) {
            updateArray.push(`${key} = '${req.body.content[key]}' `);
        }
        updateValues = updateArray.join(" , ");

        try {
            this.model.modifyDB(this.table, updateValues, req.params.id, res);
        } catch {
            res.sendStatus(400);
        }

    }

    deleteDataById (req: req, res: res) {
        try {
            this.model.deleteFromDBById(this.table, req.params.id, res);
        } catch {
            res.sendStatus(400);
        }

    }

    getDataById (req: req, res: res) {
        try {
            const rows: any = this.model.getDataFromDBById(this.table, req.params.id, res);
        } catch {
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


    getMonthData (req: req, res: res) {
        if (!req.body?.payMonth) {
            res.sendStatus(400);
            return;
        }

        try {
            this.model.getMonthDataFromDB (this.table, +req.params.paymonth, res);
        } catch {
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

    // getDayData (req: req, res: res) {
    //     connection.query(
    //         `select * from ${this.table} where payDay = ? `,
    //         [req.params.payday],
    //         (err: any, rows: any) => {
    //             if (err) {
    //                 throw err;
    //             }
    //             res.send(rows);
    //         }
    //     );
    // }
    
}