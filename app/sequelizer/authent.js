const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db =require("../models");
const User = db.user;
exports.authentification = (req, res, next) => {

    User.findOne({
        where: {
            email: req.body.email
        },
    })
        .then(user => {

            if (!user) {
                return res.status(302).json({
                    message:
                        "Login/mdp incorrect ou compte innexistant"
                });
            }
            console.log("req.body.password "+ req.body.password +"\n");
            console.log("user.password"+ user.password +"\n");

            bcrypt.compare(user.password, req.body.password,  (err, result) => {

                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
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
                    return res.status(200).json({
                        message: "Auth granted, welcome!",
                        token: token,
                        roles:['ROLE_ADMIN','ROLE_MODERATOR'],
                        login: user.login
                    });
                } return res.status(300).json({message : err});
            });
        })
        .catch(err => {

            res.status(500).json({
                error: err
            });
        });
};
