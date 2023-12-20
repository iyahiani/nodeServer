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
        firstName: {type: DataTypes.STRING, allowNull: true},
        lastName: {type: DataTypes.STRING, allowNull: true},
        idGoogle: {type: DataTypes.STRING, allowNull: true},
        photo: {type: DataTypes.STRING, allowNull: true},
        provider: {type: DataTypes.STRING, allowNull: true}


    },{
        timestamps: false
    }, {
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                } else {
                    if(user.provider === 'GOOGLE') {
                        user.password = bcrypt.password(user.idGoogle, salt);
                    }
                }
            }
        }
    });
}
