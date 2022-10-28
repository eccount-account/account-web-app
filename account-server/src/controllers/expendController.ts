import { Controller } from "./commonAPI.js";

const expendGetApi = new Controller("expend");

export const api = {
    insertData: (req: any, res: any) => { expendGetApi.insertData(req, res) },
    getAllData: (req: any, res: any) => { expendGetApi.getAllData(req, res) },
    deleteAllData: (req: any, res: any) => { expendGetApi.deleteAllData(req, res) },
    modifyDataById: (req: any, res: any) => { expendGetApi.modifyDataById(req, res) },
    deleteDataById: (req: any, res: any) => { expendGetApi.deleteDataById(req, res) },
    getDataById: (req: any, res: any) => { expendGetApi.getDataById(req, res) },


    // getYearData: (req: any, res: any) => { expendGetApi.getYearData(req, res) },
    getMonthData: (req: any, res: any) => { expendGetApi.getMonthData(req, res) },
    // getDayData: (req: any, res: any) => { expendGetApi.getDayData(req, res) }
}