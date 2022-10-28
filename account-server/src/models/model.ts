import { connectionCreated } from "../config/db.js";

export class Model {
    connection: any;
    constructor() {
        this.connection = connectionCreated;
    }

    insertToDB(table: string, dataColumn: string[], inputValues: any[], res: any) {
        this.connection.query(`insert into ${table} \
            (${dataColumn.join(", ")}) \
            values (?) `, [inputValues], (err: any, rows: any) => {
            if (err) {
                throw new Error(err);
            }
            res.sendStatus(200);
        });
    }

    getAllFromDB(table: string, res: any) {
        const rows = this.connection.query(
            `select * from ${table} `, 
            (err: any, rows: any) => {
                if (err) {
                    throw err;
                }
                res.send(rows);
        });
    }

    removeAllFromDB(table: string, res: any) {
        this.connection.query(`delete * from ${table} `, (err: any, rows: any) => {
            if (err) {
                throw err;
            }
            res.sendStatus(200);
        });
    }

    modifyDB(table: string, updateValues: string, id: string, res: any) {
        this.connection.query(
            `update ${table} set ${updateValues} where id = ?`,
            [id],
            (err: any, rows: any) => {
                if (err) {
                    throw err;
                }
                res.sendStatus(200);
            }
        );
    }
    
    deleteFromDBById (table: string, id: string, res: any) {
        this.connection.query(
            `delete from ${table} where id = ? `,
            [id],
            (err: any, rows: any) => {
                if (err) {
                    throw err;
                }
                res.sendStatus(200);
            }
        );
    }

    getDataFromDBById(table: string, id: string, res: any) {
        this.connection.query(
            `select * from ${table} where id = ? `,
            [id],
            (err: any, rows: any) => {
                if (err) {
                    throw err;
                }
                res.sendStatus(200);
            }
        );
    }

    getMonthDataFromDB(table: string, payMonth: number, res: any) {
        this.connection.query(
            `select * from ${table} where payMonth = ? `,
            [payMonth],
            (err: any, rows: any) => {
                if (err) {
                    throw err;
                }
                res.sendStatus(200);
            }
        );
    } 
}
