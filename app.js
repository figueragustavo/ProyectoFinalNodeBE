require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.PORT || 3002;

app.use("/api", require("./routes"));

console.log("http://localhost:"+port);


module.exports = app;