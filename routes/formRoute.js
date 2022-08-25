const express = require("express");
// const product = require("../models/product");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const reader = require("xlsx");
const formController = require("../controllers/formController");
const multerMiddleware = require("../middlewares/multerMiddleware");

const formRoute = express.Router();

const sampleMiddleware = async (req, res, next) => {
  // console.log("----------- request -------------");
  // console.log(req);
  // console.log("------------------------\n\n\n");
  console.log("__dirname");
  console.log(__dirname);
  //D:\INSTRIVE\coding_challenge\server\routes
  next();
};

const readData = () => {
  const file = reader.readFile(
    "E:\\TEMP TO BE DELETED\\dummyBackend\\uploads\\e84be96cf512fc7ad04844ba6ae27c48.xlsx"
  );

  let data = [];

  console.log("----------- File -------------");
  console.log(file);
  console.log("------------------------\n\n\n");

  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);

  console.log("----------- XL data -------------");
  console.log(temp);
  console.log("------------------------\n\n\n");
};

formRoute.post(
  "/uploadForm",
  [multerMiddleware.single("req_file")],
  formController
);

module.exports = formRoute;
