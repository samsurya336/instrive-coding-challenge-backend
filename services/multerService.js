const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    console.log("ext : ", ext);
    cb(null, `uploads/admin-${file.fieldname}-${Date.now()}.${ext}`);
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
const multerUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.module = multerUpload;
