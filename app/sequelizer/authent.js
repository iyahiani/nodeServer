const bcrypt = require('bcryptjs');
const db = require('../sequelizer/initDB');
const secret = require("../config/secretClient");
const jwt = require('jsonwebtoken');

exports.authentification = (req, res, next) => {

    db.users.findOne({
        where: {
            email: req.body.email
        },
    })
        .then(user => {
            for (let i = 0; i < user.length; i++)  {
                console.log("row"+i+ user[i].dataValues);
            }
            if (!user) {
                return res.status(401).json({
                    message:
                        "Auth failed!! either the account does't exist or you entered a wrong account"
                });
            }
            console.log(user);
            bcrypt.compare(req.body.password, user.passwordHash, (err, result) => {

                if (err) {
                    return res.status(203).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user.email,
                            password: user.id
                        },
                        secret
                        ,
                        {
                            expiresIn: "1h"
                        }
                    );

                    res.status(200).json({
                        message: "Auth granted, welcome!",
                        token: token
                    });
                }
            });
        })
        .catch(err => {

            res.status(500).json({
                error: err
            });
        });
};
