const cloudinary = require("cloudinary").v2;
const { getLogger } = require("./logging");
const config = require("config");

const CLOUD_NAME = config.get("cloudinary.name");
const CLOUD_KEY = config.get("cloudinary.key");
const CLOUD_SECRET = config.get("cloudinary.secret");

let cloudinaryInstance;

const getCloudinary = () => {
  if (!cloudinaryInstance)
    throw new Error("You need to initialize cloudinary instance first");

  return cloudinaryInstance;
};

const initializeCloudinary = () => {
  logger = getLogger();
  logger.info("Starting with cloudinary initialization");
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_KEY,
    api_secret: CLOUD_SECRET,
    secure: true,
  });
  cloudinaryInstance = cloudinary;
  logger.info("Cloudinary initialized");
  return cloudinaryInstance;
};

module.exports = {
  initializeCloudinary,
  getCloudinary,
};
