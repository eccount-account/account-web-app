import { monthModel } from "../models/monthModel";

export class monthTotalController {
    model : monthModel;
    constructor() { 
        this.model = new monthModel();
    }

    getAllData = (req: any, res: any) => {
        if (!req.body?.content) {
            res.sendStatus(400);
            return;
        }
        
        let payYear;
        let payMonth;

        for (let key in req.body.content) {
            if (key == "payYear") {
                payYear = req.body.content[key];
            } else if (key == "payMonth") {
                payMonth = req.body.content[key];
            }
        }

        try {
            this.model.getUnionQuery(payYear, payMonth, res);
        } catch {
            res.sendStatus(400);
        }
        
    }
}