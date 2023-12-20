const express = require("express");
const bodyParser = require("body-parser"); /* deprecated */
const app = express();
const crudSeq = require("./app/controllers/user.controller");
const authent = require("./app/sequelizer/authent");
const cors = require("cors");
const {static} = require("express");
const os = require('os');
const corsOptions ={
  origin:['http://localhost:4200','http://109.106.244.164','https://ismaely.com'],
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
};

console.log(os.hostname());

require('dotenv').config();
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(cors(corsOptions));
app.get("/",(req,res)=>{
    res.send('hello')
});
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
app.get('/api/user:idUser', function (req, res) {
    // 👇️ if your HTML file is in the root directory (next to package.json)
    //res.sendFile(__dirname + '/ecom/dist');
});
app.post("/api/create", (req, res) => {
//  req.getFile(__dirname + '/ecom/dist');
    if(req.body){
        authent.register(req, res)
  }
});
// google Register
app.post("/api/googleRegister", (req, res) => {
    authent.authentification(req, res)
});
// FB Register
app.post("/api/FBregister", (req, res) => {
    authent.authentification(req, res)
});
// google Authent
app.post("/api/googleAuthent", (req, res) => {
    authent.authentification(req, res)
});
// FB Authent
app.post("/api/FBAuthent", (req, res) => {
    authent.authentification(req, res)
});
//app.use(express.static(__dirname +'/ecom/dist'));
// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.set('port', PORT);
app.set('securePort',PORT);
var ip = require("ip");
const {readFileSync} = require("fs");
const {createServer} = require("https");
console.dir ("ip "+  ip.address() );
/*app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});*/
// fin test
/*server.listen(4000, "localhost", () => {
  console.log("Listening for request");
});
*/
//configure options for the https server
let options={
    key:readFileSync(__dirname+"/bin/rootCA.key"),
cert:readFileSync(__dirname+"/bin/localhost.crt"),
passphrase:"Enia"
}
//create https server
let httpsServer=createServer(options,app);
httpsServer.listen(app.get("securePort"),()=>{
    console.log(`Server running on port ${app.get("securePort")}`)
});

function onError() {

}

httpsServer.on("error", onError);

function onListening() {

}

httpsServer.on("listening", onListening);
console.log('Server running on port');
