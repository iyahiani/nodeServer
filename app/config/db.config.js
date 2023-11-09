module.exports = {
  host: "62.72.37.52",
  user: "u417867344_root",
  password: "Enia@122020",
  database: "u417867344_ecom",
  dialect:"mysql",
  connectionLimit: 10,
  debug: false,
  port: 3306,
  pool: {
    max: 15,
    min: 5,
    idle: 20000,
    evict: 15000,
    acquire: 30000
  }
};
