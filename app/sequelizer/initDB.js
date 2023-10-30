const config = require('../config/db.config');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const connection = await mysql.createConnection({ host: config.host, port: config.port, user: config.user, password: config.password });
    //await connection.query(`CREATE DATABASE IF NOT EXISTS \`${'u417867344_root'}\`;`);

    // connect to db
    const sequelize = new Sequelize(config.database, config.user, config.password, { dialect: 'mysql',host:config.host });

    // init models and add them to the exported db object
    db.User = require('../sequelizer/user.model')(sequelize);

    // sync all models with database
        await sequelize.sync({ alter: true });
}
