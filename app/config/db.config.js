module.exports = {
  host: "45.87.81.102",
  user: "u417867344_root",
  password: "Enia@122020",
  database: "u417867344_root",
  dialect:"mysql",
  port: 3306,
  connectionLimit: 10,
  debug: false,
  pool: {
    max: 1000000,
    idle: 3000000,
    acquireTimeout: 6000000
  }
};
