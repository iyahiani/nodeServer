const connection = require("./db");
const pool = require("../config/pool.config")
const User = function(user) {
    this.login = user.login;
    this.password = user.password;
};

User.create = (users, result) => {
    var user = {
        "login": users.login,
        "password": users.password,
        "email": '',
        "role": 'user'
    };
    pool.query('INSERT INTO users SET ?', user, (err, res) => {
        //sql.release();
        if (err) {
            console.log("error: ", err);
            return result(err);

        }
        console.log("created user: ", { id: res.insertId, ...users });

        return (result);
    });

};

User.findByName = (users,re)
module.exports = User;
