//// SEQUELIZE
const { DataTypes} = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        idUser : {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role: { type: DataTypes.STRING, allowNull: true }
    };

    const options = {
        /*defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },*/
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('roles', attributes, options);
}
