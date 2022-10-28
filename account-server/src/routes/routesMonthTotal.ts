import express from "express";
import { monthTotalController } from "../controllers/monthTotalController.js";
export const monthTotalRouter = express.Router();

const monthController = new monthTotalController();
monthTotalRouter.post('/', monthController.getAllData);