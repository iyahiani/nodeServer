
const pool = require("../config/pool.config")
const User = function(user) {
    this.login = user.login;
    this.password = user.password;
    this.email = user.email;
    this.role = user.role;
};

User.create = (users, result) => {
    var user = {
        "login": users.login,
        "password": users.password,
        "email": users.email,
        "role": 'user'
    };
    pool.query('INSERT INTO users SET ?', user, (err, res) => {
        //sql.release();
        if (err) {
            console.log("error: ", err);
            return result(err);

        }


        return (result);
    });

};

module.exports = User;


