const user = require("../controllers/user.controller");
var router = require("express").Router();
module.exports = app => {
    router.post("/user", user.create);
}
