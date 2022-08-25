const express = require("express");
const formRoute = require("./routes/formRoute");
const mongoose = require("mongoose");
const { createFolder } = require("./services/files");
const { api } = require("./services/utils");
const app = express();
const url = "mongodb://localhost:27017/instrive";

mongoose.connect(url);
const mongooseConnection = mongoose.connection;

mongooseConnection.on("open", () => {
  console.log("connected...");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", api.baseUrl);
  res.setHeader("Access-Control-Allow-Methods", "POST");
  next();
});

app.use(express.json());

app.use("/api/v0.1/forms", formRoute);

app.listen(6001, () => {
  createFolder(`${__dirname}\\tempUploads`);
  console.log("App Listening on PORT : ", 6001);
});

exports.app = app;
