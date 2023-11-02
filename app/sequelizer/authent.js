const bcrypt = require('bcryptjs');
const db = require('../sequelizer/initDB');
const jwt = require('jsonwebtoken');

exports.authentification = (req, res, next) => {

    db.users.findOne({
        where: {
            email: req.body.email
        },
    })
        .then(user => {

            if (!user) {
                return res.status(401).json({
                    message:
                        "Login/mdp incorrect ou compte innexistant"
                });
            }
            bcrypt.compare(req.body.password, user.passwordHash, (err, result) => {

                if (err) {
                    return res.status(203).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    console.log(process.env);
                    const token = jwt.sign(
                        {
                            email: user.email,
                            idUser: user.idUser
                        },
                        `${process.env.SECRET_KEY}`
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
