import express from "express";
import { incomeRouter as income } from "./routes/routesIncome.js";
import { expendRouter as expend } from "./routes/routesExpend.js"; 
import { monthTotalRouter as monthTotal } from "./routes/routesMonthTotal.js"; 
const app = express();

app.use(express.static("../../account-front/dist"));
app.use(express.json());
app.use('/api/income', income);
app.use('/api/expend', expend);
app.use('/api/monthtotal', monthTotal);

app.listen(3000, () => {
    console.log("listening on 3000…");
});