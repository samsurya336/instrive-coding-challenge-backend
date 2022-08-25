const multer = require("multer");
const path = require("path");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Multer Filter
const multerFilter = (req, file, cb) => {
  cb(null, true);
  // if (file.mimetype.split('/')[1] === 'xlsx'){
  // } else{
  //   cb(new Error('Not a PDF File!!'), false)
  // }
};

//Calling the "multer" Function
const multerMiddleware = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = multerMiddleware;
