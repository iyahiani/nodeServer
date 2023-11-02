const User = require("../models/user.model.js");
const connection  = require("../models/db");
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Tutorial
    const user = new User({
        login: req.body.login,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
    });
    // Save Tutorial in the database
    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the user."
            });

        } else {
           res.send(data);
        }


    });
};
