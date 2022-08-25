const { throwServerError } = require("../services/errors");
const { successResponse, failureResponse } = require("../services/response");
const reader = require("xlsx");

const formController = async (req, res) => {
  try {
    // console.log("----------- request -------------");
    // console.log(req);
    // console.log("------------------------\n\n\n");

    console.log("----------- req.files -------------");
    // console.log(req.file);
    console.log(req.body);
    console.log("------------------------");

    if (!(req.file && typeof req.file.filename === "string")) {
      return throwServerError("Unable to process the file");
    }

    const absolutePathToUploadsFolder = __dirname.replace(
      "controllers",
      "uploads"
    );
    const absolutePathToCurrentUploadedFile = `${absolutePathToUploadsFolder}\\${req.file.filename}`;
    console.log(absolutePathToCurrentUploadedFile);

    const jsonDataFromFile = getJsonDataFromFile(
      absolutePathToCurrentUploadedFile
    );

    res.send(" Hit uploadFileWithMeta ");
    // return successResponse(res, {
    //   message: "Post edited successfully",
    //   postId: "",
    // });
  } catch (error) {
    return failureResponse(res, error);
  }
};

function getJsonDataFromFile(filePath) {
  const file = reader.readFile(filePath);

  console.log("----------- File -------------");
  console.log(file);
  console.log("------------------------\n\n\n");

  const result = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);

  console.log("----------- XL data -------------");
  console.log(result);
  console.log("------------------------\n\n\n");
}

module.exports = formController;
