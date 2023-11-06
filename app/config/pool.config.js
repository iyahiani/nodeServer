const mysql = require("mysql");
var pool = mysql.createPool({
    host: "88.127.119.39'",
    user: "u417867344_ecom",
    password: "Enia@122020",
    database: "u417867344_ecom",
    dialect:"mysql",
    port: 3306,
    connectionLimit: 10,
    debug: false,
    acquireTimeout: 10000
});
module.exports = pool;
