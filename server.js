const express = require("express");
const bodyParser = require("body-parser"); /* deprecated */
const app = express();
const crudSeq = require("./app/controllers/user.controller");
const authent = require("./app/sequelizer/authent");
const cors = require("cors");
const {static} = require("express");
const os = require('os');
const corsOptions ={
  origin:['http://localhost:4001','http://localhost:4000'],
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
};

console.log(os.hostname());

require('dotenv').config();
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + "nodejs-express-mysql"));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    if (req.method === "OPTIONS") {
        res.send(200);
    }
    next();
});
app.use(cors());
app.get("/api", (req,res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
      JSON.stringify({
        product_id: "xyz12u3",
        product_name: "NginX injector",
      }));
});

app.post("/api/login", (req, res) => {
  authent.authentification(req, res)
});
//// Login
app.get('/api/create', function (req, res) {
    // 👇️ if your HTML file is in the root directory (next to package.json)
    res.sendFile(__dirname + '/ecom/dist');
});
app.post("/api/create", (req, res) => {
  req.getFile(__dirname + '/ecom/dist');
    if(req.body){
    crudSeq.create(req,res);
  }
});
app.use(express.static(__dirname +'/ecom/dist'));
// set port, listen for requests
const PORT = process.env.PORT || 4000;

//test
const http = require("http");

const server = http.createServer((req, res) => {
  const urlPath = req.url;
   if (urlPath === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
        JSON.stringify({
          product_id: "xyz12u3",
          product_name: "NginX injector",
        })
    );
  } else {
    res.end("Successfully started a server");
  }
});
var ip = require("ip");
console.dir ("ip "+  ip.address() );
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
// fin test
/*server.listen(4000, "localhost", () => {
  console.log("Listening for request");
});
*/
