import mysql from "mysql2/promise"

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Emilie01",
    database: "klimateket",
});

export default connection;