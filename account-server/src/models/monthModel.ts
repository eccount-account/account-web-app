import { connectionCreated } from "../config/db.js";
import express from "express";

type res = express.Response;

export class monthModel {
    connection: any;
    constructor() {
        this.connection = connectionCreated;
    }

    getUnionQuery(payYear: number, payMonth: number, res: res){
        this.connection.query(
            `(select id, payedMoney, payYear, payMonth, payDay, payTime, '수입' as classify, category, memo
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
            `,[payYear, payMonth, payYear, payMonth],
            (err: any, rows: any) => {
                if (err) {
                    res.sendStatus(400);
                    return;
                }
                res.send(rows);
            }
        )
    }
    
}