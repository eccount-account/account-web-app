import { Controller } from "./commonAPI.js";
import express from "express";

type req = express.Request;
type res = express.Response;

const expendGetApi = new Controller("expend");

export const api = {
    insertData: (req: req, res: res) => { expendGetApi.insertData(req, res) },
    getAllData: (req: req, res: res) => { expendGetApi.getAllData(req, res) },
    deleteAllData: (req: req, res: res) => { expendGetApi.deleteAllData(req, res) },
    modifyDataById: (req: req, res: res) => { expendGetApi.modifyDataById(req, res) },
    deleteDataById: (req: req, res: res) => { expendGetApi.deleteDataById(req, res) },
    getDataById: (req: req, res: res) => { expendGetApi.getDataById(req, res) },
    getMonthData: (req: req, res: res) => { expendGetApi.getMonthData(req, res) },
}