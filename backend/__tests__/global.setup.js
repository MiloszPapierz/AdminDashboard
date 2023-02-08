const config = require("config");

const { initializeDatabaseConnection } = require("../src/data/index");
const { initializeCloudinary } = require("../src/core/cloudinary");
const { initializeLogger } = require("../src/core/logging");

module.exports = async () => {
  initializeLogger({
    level: config.get("log.level"),
    disabled: config.get("log.disabled"),
  });

  await initializeDatabaseConnection();
  await initializeCloudinary();
};
