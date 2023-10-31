const express = require("express");
const bodyParser = require("body-parser"); /* deprecated */
const app = express();
const crudSeq = require("./app/sequelizer/user.service")
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + "nodejs-express-mysql"));
app.use((req, res, next) => {
  res.header("Content-Type", "application/json; charset=utf-8","x-access-token");
  res.header("Content-Type: application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application.get" });
   //res.sendFile('index.html',{root:__dirname})
});

app.post("/user", (req, res) => {
  //res.json({ message: "Welcome to bezkoder application.post" });
  if(req.body){
    //  console.log("req.body"+ req.body);
    crudSeq.create(req.body).then(function(data){
      console.log("response"+ data);
      if (data) {
        res.status(data.status);
        res.json(data);
      }
    });
  }

  //res.sendFile('index.html',{root:__dirname})
});
//app.post('/user',user.create)

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
