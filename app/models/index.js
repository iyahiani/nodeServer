const { DataTypes, Sequelize} = require('sequelize');
const config = require("../config/db.config");
const sequelize = new Sequelize(config.database, config.user, config.password,{host: config.host, port: config.port,dialect: 'mysql', pool: config.pool});
const db = {};
db.Sequelize = Sequelize ;
db.sequelize = sequelize ;
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });
db.user = require("./user.model")(sequelize, Sequelize);
module.exports = db;
