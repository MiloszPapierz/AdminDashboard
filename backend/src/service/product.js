const productRepository = require("../repository/product");
const { getLogger } = require("../core/logging");
const { getCloudinary } = require("../core/cloudinary");
const streamifier = require("streamifier");
const ServiceError = require("../core/serviceError");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();

  this.logger.debug(message, meta);
};

const uploadFile = (buffer, productName) => {
  return new Promise((resolve, reject) => {
    const cloudinary = getCloudinary();

    const upload_stream = cloudinary.uploader.upload_stream(
      { public_id: `${productName}` },
      (error, result) => {
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(upload_stream);
  });
};

const deleteFile = async (productName) => {
  const cloudinary = getCloudinary();
  const logger = getLogger();
  logger.info("Deleting image from cloud");
  try {
    await cloudinary.uploader.destroy(productName);
  } catch (error) {
    logger.info("Error in deleting file from cloud", error);
    throw error;
  }
};

const changeProductName = (productName) => {
  //Public_id format supports all printable chars expect the following: ? & # \ % < >
  //spaces and / cannot be used as the first or last character of the Public_id
  const errorChars = ["?", "&", "#", "\\", "%", "<", ">", "/"];

  errorChars.forEach((c) => (productName = productName.replaceAll(c, " ")));
  productName.trim();

  return productName;
};

const getAll = async () => {
  debugLog("Fetching all products");
  const products = await productRepository.getAll();

  return {
    items: products,
    count: products.length,
  };
};

const getById = async (id) => {
  debugLog(`Fetching product with id ${id}`);

  const product = await productRepository.getById(id);

  if (!product) {
    throw ServiceError.notFound(`There is no product with id ${id}`, {
      id,
    });
  }

  return product;
};

const create = async (product, file) => {
  debugLog("Creating new product", product);
  let imageUrl = "";
  if (file) {
    try {
      debugLog("Uploading image to cloud");
      const cloudProductName = changeProductName(product.productName);
      imageUrl = await uploadFile(file.buffer, cloudProductName);
    } catch (error) {
      const logger = getLogger();
      logger.error("Error while uploading image to cloud", error);
      throw error;
    }
  }

  const id = await productRepository.create({ ...product, imageUrl });

  return getById(id);
};

const updateById = async (id, product, file) => {
  debugLog(`Updating product with id ${id}`, product);
  let imageUrl = "";
  if (file) {
    const productToUpdate = await getById(id);
    const cloudProductName = changeProductName(product.productName);
    if (productToUpdate?.imageUrl) {
      await deleteFile(cloudProductName);
    }

    try {
      debugLog("Uploading image to cloud");
      imageUrl = await uploadFile(file.buffer, cloudProductName);
    } catch (error) {
      const logger = getLogger();
      logger.error("Error while uploading image to cloud", error);
      throw error;
    }
  }

  await productRepository.updateById(id, { imageUrl, ...product });
  return getById(id);
};

const deleteById = async (id) => {
  debugLog(`Deleting product with id ${id}`);

  const productToDelete = await getById(id);

  //if there is an imaageUrl in db -> delete image from cloud
  if (productToDelete.imageUrl) {
    const cloudProductName = changeProductName(productToDelete.productName);
    await deleteFile(cloudProductName);
  }

  return await productRepository.deleteById(id);
};

module.exports = {
  getAll,
  create,
  updateById,
  deleteById,
};
