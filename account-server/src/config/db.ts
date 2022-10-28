import mysql from "mysql";

const modelInfo = {
    host: "localhost",
    user: "root",
    password: "1q2w3e4r",
    database: "accountbook",
};

export const connectionCreated = mysql.createConnection({
    host: modelInfo.host,
    user: modelInfo.user,
    password: modelInfo.password,
    database: modelInfo.database,
});