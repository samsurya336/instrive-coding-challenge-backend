const express = require("express");
const formRoute = require("./routes/formRoute");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/instrive";
// stopped in auth schema
const app = express();
// app.use(helmet)

// mongoose.connect(url);
// const mongooseConnection = mongoose.connection;

// mongooseConnection.on("open", () => {
//   console.log("connected...");
// });

app.use(express.json());

app.use("/api/v0.1/forms", formRoute);

app.listen(6001, () => {
  console.log("App Listening on PORT : ", 6001);
});

exports.app = app;
