const express = require("express");
const bodyParser = require("body-parser"); /* deprecated */
const app = express();
const crudSeq = require("./app/controllers/user.controller");
const authent = require("./app/sequelizer/authent");
const cors = require("cors");
const corsOptions ={
  origin:['http://localhost:4001','http://localhost:4000','http://localhost:4200','http://109.106.244.164','https://45.87.81.120'],
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
};



require('dotenv').config();
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + "nodejs-express-mysql"));
app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8","x-access-token");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(cors(corsOptions));
app.get("/", (req,res) => {
  res.json({message : "node connected"});
});
app.get("/api", (req,res) => {

});

app.post("/api/login", (req, res) => {
  authent.authentification(req, res)
});
//// Login
app.post("/api/create", (req, res) => {
  if(req.body){
    crudSeq.create(req,res);
  }
});

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
