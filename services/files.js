var fs = require("fs");
const { throwServerError } = require("./errors");

exports.createFolder = (path) => {
  try {
    fs.mkdirSync(path, { recursive: true });
  } catch (_) {}
};

exports.removeFile = (path) => {
  fs.rm(path, (status) => {
    if (status) {
      throwServerError("Something went wrong, please try again later");
    }
  });
};
