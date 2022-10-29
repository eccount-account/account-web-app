
import express from "express";
import { api as expendController } from "../controllers/expendController.js";
export const expendRouter = express.Router();

expendRouter.post('/', expendController.insertData);

expendRouter.get('/', expendController.getAllData);

expendRouter.delete("/id/:id", expendController.deleteDataById);

expendRouter.put("/id/:id", expendController.modifyDataById);

expendRouter.get("/id/:id", expendController.getDataById);

expendRouter.get("/paymonth/:paymonth", expendController.getMonthData);