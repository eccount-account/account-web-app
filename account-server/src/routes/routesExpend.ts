
import express from "express";
import { api as expendController } from "../controllers/expendController.js";
export const expendRouter = express.Router();

expendRouter.post('/', expendController.insertData);

expendRouter.get('/', expendController.getAllData); // 삭제?

expendRouter.delete("/id/:id", expendController.deleteDataById);

expendRouter.put("/id/:id", expendController.modifyDataById);

expendRouter.get("/id/:id", expendController.getDataById);

// expendRouter.get("/payyear/:payyear", expendController.getYearData); //

expendRouter.get("/paymonth/:paymonth", expendController.getMonthData); //

// expendRouter.get("/payday/:payday", expendController.getDayData); //
