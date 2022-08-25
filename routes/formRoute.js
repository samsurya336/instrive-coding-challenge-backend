const express = require("express");
const formController = require("../controllers/formController");
const multerMiddleware = require("../middlewares/multerMiddleware");

const formRoute = express.Router();

formRoute.post(
  "/uploadForm",
  [multerMiddleware.single("req_file")],
  formController
);

module.exports = formRoute;
