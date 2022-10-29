import { connectionCreated } from "../config/db.js";
import mysql, { MysqlError } from "mysql";
import express from "express";

type res = express.Response;

export class Model {
    connection: mysql.Connection;
    constructor() {
        this.connection = connectionCreated;
    }

    insertToDB(table: string, dataColumn: string[], inputValues: any[], res: res) {
        this.connection.query(`insert into ${table}
            (${dataColumn.join(", ")})
            values (?) `, [inputValues], 
            (err: any, rows: any) => {
            if (err) {
                res.sendStatus(400);
                return;
            }
            res.sendStatus(200);
        });
    }

    getAllFromDB(table: string, res: res) {
        const rows = this.connection.query(
            `select * from ${table} `, 
            (err: any, rows: any) => {
                if (err) {
                    res.sendStatus(400);
                    return;
                }
                res.send(rows);
        });
    }

    removeAllFromDB(table: string, res: res) {
        this.connection.query(`delete * from ${table} `, (err: any, rows: any) => {
            if (err) {
                res.sendStatus(400);
                return;
            }
            res.sendStatus(200);
        });
    }

    modifyDB(table: string, updateValues: string, id: number, res: res) {
        console.log(table);
        console.log(updateValues);
        this.connection.query(
            `update ${table} set ${updateValues} where id = ?`,
            [id],
            (err: any, rows: any) => {
                if (err) {
                    res.sendStatus(400);
                    console.log(err);
                    return;
                }
                res.sendStatus(200);
            }
        );
    }
    
    deleteFromDBById (table: string, id: number, res: res) {
        this.connection.query(
            `delete from ${table} where id = ? `,
            [id],
            (err: any, rows: any) => {
                if (err) {
                    res.sendStatus(400);
                    return;
                }
                res.sendStatus(200);
            }
        );
    }

    getDataFromDBById(table: string, id: number, res: res) {
        this.connection.query(
            `select * from ${table} where id = ? `,
            [id],
            (err: any, rows: any) => {
                if (err) {
                    res.sendStatus(400);
                    return;
                }
                res.send(rows);
            }
        );
    }

    getMonthDataFromDB(table: string, payMonth: number, res: res) {
        this.connection.query(
            `select * from ${table} where payMonth = ? `,
            [payMonth],
            (err: any, rows: any) => {
                if (err) {
                    res.sendStatus(400);
                    return;
                }
                res.sendStatus(200);
            }
        );
    } 
}
