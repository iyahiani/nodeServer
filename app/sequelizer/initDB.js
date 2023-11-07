
const config = require('../config/db.config');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const user = require('../models/user.model');

exports.module =async function initialize() {

    await user().then(() => {
        console.log('user table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });

}
