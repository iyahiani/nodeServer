const mysql = require("mysql");
var pool = mysql.createPool({
    host: "45.87.81.102",
    user: "u417867344_root",
    password: "Enia@122020",
    database: "u417867344_root",
    dialect:"mysql",
    port: 3306,
    connectionLimit: 10,
    debug: false,
    acquireTimeout: 10000
});
module.exports = pool;
