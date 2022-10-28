import express from "express";
import { api as incomeController } from "../controllers/incomeController.js";
export const incomeRouter = express.Router();

incomeRouter.post('/', incomeController.insertData);

incomeRouter.get('/', incomeController.getAllData);

incomeRouter.delete('/', incomeController.deleteAllData);

incomeRouter.put("/id/:id", incomeController.modifyDataById);

incomeRouter.delete("/id/:id", incomeController.deleteDataById);

incomeRouter.get("/id/:id", incomeController.getDataById);

// incomeRouter.get("/payyear/:payyear", incomeController.getYearData);

incomeRouter.get("/paymonth/:paymonth", incomeController.getMonthData);

// incomeRouter.get("/payday/:payday", incomeController.getDayData);
