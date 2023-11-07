module.exports = {
  host: "193.203.168.3",
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
