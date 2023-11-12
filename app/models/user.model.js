//// SEQUELIZE

const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize)=>{
    return sequelize.define('users', {
        idUser: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {type: DataTypes.STRING, allowNull: true},
        password: {type: DataTypes.STRING, allowNull: false},
        username: {type: DataTypes.STRING, allowNull: false},
        roles: {type: DataTypes.STRING, allowNull: true},

    },{
        timestamps: false
    }, {
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
        }
    });
}
