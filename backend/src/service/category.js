const categoryRepository = require("../repository/category");
const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog("Fetching all categories");

  const categories = await categoryRepository.getAll();

  return {
    items: categories,
    count: categories.length,
  };
};

const getById = async (id) => {
  debugLog(`Fetching category with id ${id}`);

  const category = await categoryRepository.getById(id);

  if (!category) {
    throw ServiceError.notFound(`There is no category with id ${id}`, {
      id,
    });
  }

  return category;
};

const create = async ({ categoryName }) => {
  debugLog("Creating new category", { categoryName });
  const { categoryID } = await categoryRepository.create({ categoryName });
  return getById(categoryID);
};

const updateById = async (id, { categoryName }) => {
  debugLog(`Updating category with ${id}`, { categoryName });
  await categoryRepository.updateById(id, { categoryName });

  return getById(id);
};

const deleteById = async (id) => {
  debugLog(`Deleting category with id: ${id}`);
  return await categoryRepository.deleteById(id);
};

module.exports = {
  getAll,
  create,
  updateById,
  deleteById,
};
