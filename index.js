require("dotenv").config();
const express = require("express");
const {dbConnectMySql} = require("./config/mysql")
const cors = require("cors");

const app = express();

app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));

app.use(express.json());

const port = process.env.PORT || 3002;

app.use("/api", require("./routes"));


  app.listen(port, () => {
    console.log("http://localhost:"+port);
  });

dbConnectMySql();

module.exports = app;