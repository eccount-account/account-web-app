import { Controller } from "./commonAPI.js";
import express from "express";

type req = express.Request;
type res = express.Response;

const incomeGetApi = new Controller("income");


export const api = {
    insertData: (req: req, res: res) => { incomeGetApi.insertData(req, res) },
    getAllData: (req: req, res: res) => { incomeGetApi.getAllData(req, res) },
    deleteAllData: (req: req, res: res) => { incomeGetApi.deleteAllData(req, res) },
    modifyDataById: (req: req, res: res) => { incomeGetApi.modifyDataById(req, res) },
    deleteDataById: (req: req, res: res) => { incomeGetApi.deleteDataById(req, res) },
    getDataById: (req: req, res: res) => { incomeGetApi.getDataById(req, res) },
    getMonthData: (req: req, res: res) => { incomeGetApi.getMonthData(req, res) },
}