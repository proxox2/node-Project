const express=require("express");
const bodyParser=require("body-parser");
const api = require("./api/Controllers/routes");
const config=require('./config/config.js');

const app = express();

app.use(
    bodyParser.urlencoded({
      extended: false,
      parameterLimit: 10000,
      limit: 1024 * 1024 * 10,
    })
  );

app.use(bodyParser.json({ limit: "30mb" }));
app.use("/api", api.router);

app.listen(config.port, () => {
    console.log("Server running at",config.port);
  });