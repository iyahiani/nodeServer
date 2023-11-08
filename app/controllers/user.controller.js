
const bcrypt = require("bcryptjs");
const db =require("../models");
const User = db.user;
exports.create = (req, res) => {
    // Validate request

    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    User.findOne({ where: { email: req.body.email} }).then(async user => {
        if (user) {
            return res.status(202).json({
                message:
                    "l'utilisateur existe deja"
            });
        }else {
            let user = {};
                  user ={
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                role: req.body.role
            };
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const pass = await User.build(user);
            await pass.update(hashedPassword);
            await pass.save();
            return res.status(200).json({message: "l'utlisateur est enregistré avec succés"})
        }

    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const email =  req.body.email;
    User.findOne({ where: { email: params.email } }).then(async user => {
        if (user) {
            return res.status(202).json({
                message:
                    "l'utilisateur existe deja"
            });
        }
        return res.status(200);

    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};
