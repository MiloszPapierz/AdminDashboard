const multer = require("@koa/multer");
const ServiceError = require("./serviceError");

const uploadFilter = (req, file, cb) => {
  const typeArray = file.mimetype.split("/");
  const fileType = typeArray[1];
  if (fileType == "png" || fileType == "jpg" || fileType == "jpeg") {
    cb(null, true);
  } else {
    cb(
      ServiceError.validationFailed("Unsupported file type", { fileType }),
      true
    );
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: uploadFilter,
});

module.exports = {
  upload,
};
