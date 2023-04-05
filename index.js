require("dotenv").config();
const express = require("express");
const {dbConnectMySql} = require("./config/mysql")

const app = express();

app.use(express.json());

const port = process.env.PORT || 3002;

app.use("/api", require("./routes"));


  app.listen(port, () => {
    console.log("http://localhost:"+port);
  });

dbConnectMySql();

module.exports = app;