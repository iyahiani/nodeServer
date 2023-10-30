//// SEQUELIZE
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        idUser : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: { type: DataTypes.STRING, allowNull: true },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
        login: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, allowNull: true }
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}
