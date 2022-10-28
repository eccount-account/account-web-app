import { Controller } from "./commonAPI.js";

const incomeGetApi = new Controller("income");

export const api = {
    insertData: (req: any, res: any) => { incomeGetApi.insertData(req, res) },
    getAllData: (req: any, res: any) => { incomeGetApi.getAllData(req, res) },
    deleteAllData: (req: any, res: any) => { incomeGetApi.deleteAllData(req, res) },
    modifyDataById: (req: any, res: any) => { incomeGetApi.modifyDataById(req, res) },
    deleteDataById: (req: any, res: any) => { incomeGetApi.deleteDataById(req, res) },
    getDataById: (req: any, res: any) => { incomeGetApi.getDataById(req, res) },

    // getYearData: (req: any, res: any) => { incomeGetApi.getYearData(req, res) },
    getMonthData: (req: any, res: any) => { incomeGetApi.getMonthData(req, res) },
    // getDayData: (req: any, res: any) => { incomeGetApi.getDayData(req, res) }
}