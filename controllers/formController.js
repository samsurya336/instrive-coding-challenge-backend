const {
  throwServerError,
  throwRequestError,
  throwNotFoundError,
} = require("../services/errors");
const { successResponse, failureResponse } = require("../services/response");
const reader = require("xlsx");
const { removeFile } = require("../services/files");
const { validateEmail } = require("../services/utils");
const FormModel = require("../models/formModel");

const formController = async (req, res) => {
  try {
    const _body = { ...req.body };

    validateFormBody(_body);

    const _form = new FormModel({
      userName: _body.userName,
      email: _body.email,
    });

    const savedForm = await _form.save();

    if (req.file === null || req.file === undefined) {
      return successResponse(res, {
        message: "Successfully submitted Form without File",
      });
    } else if (req.file && typeof req.file.filename === "string") {
      const absolutePathToUploadsFolder = __dirname.replace(
        "controllers",
        "tempUploads"
      );
      const absolutePathToCurrentUploadedFile = `${absolutePathToUploadsFolder}\\${req.file.filename}`;

      const jsonDataFromFile = getJsonDataFromFile(
        absolutePathToCurrentUploadedFile
      );

      checkFileHasValidData(jsonDataFromFile);

      const updateOneResponse = await FormModel.updateOne(
        {
          _id: savedForm["_id"],
        },
        {
          fileName: req.file.originalname,
        },
        { upsert: true }
      );

      if (updateOneResponse.modifiedCount !== 1) {
        return throwNotFoundError("Unable to update File");
      }
      // removing the added temp file
      removeFile(absolutePathToCurrentUploadedFile);
    }

    return successResponse(res, {
      message: "Successfully submitted Form with File",
    });
  } catch (error) {
    return failureResponse(res, error);
  }
};

function validateFormBody(data) {
  if (
    !(
      typeof data.userName === "string" &&
      data.userName.trim().length > 0 &&
      typeof data.email === "string" &&
      data.email.trim().length > 0
    )
  ) {
    return throwRequestError("Invalid form fields");
  }
  if (validateEmail(data.email) === false) {
    return throwRequestError("Invalid form fields");
  }
  return true;
}

function getJsonDataFromFile(filePath) {
  const file = reader.readFile(filePath);
  const result = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]]);
  return result;
}

function checkFileHasValidData(jsonDataArray) {
  if (!(Array.isArray(jsonDataArray) && jsonDataArray.length > 0)) {
    return throwServerError("Unable to process the file 2");
  }
  for (const rowsDataInExcelFile of jsonDataArray) {
    if (
      !(
        typeof rowsDataInExcelFile["College"] === "string" &&
        rowsDataInExcelFile["College"].trim().length > 0
      )
    ) {
      throwRequestError("Missing College data in uploaded Excel file");
      break;
    } else if (
      !(
        typeof rowsDataInExcelFile["University"] === "string" &&
        rowsDataInExcelFile["University"].trim().length > 0
      )
    ) {
      throwRequestError("Missing University data in uploaded Excel file");
      break;
    }
  }
}

module.exports = formController;
