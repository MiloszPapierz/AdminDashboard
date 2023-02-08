const { getLogger } = require("../core/logging");
const { getKnex, tables } = require("../data/index");

const getAll = async (id) => {
  return await getKnex()(tables.category).select();
};

const getById = async (id) => {
  return await getKnex()(tables.category)
    .select()
    .where(`${tables.category}.categoryID`, id)
    .first();
};

const create = async ({ categoryName }) => {
  const [categoryID] = await getKnex()(tables.category).insert({
    categoryName,
  });
  return { categoryID, categoryName };
};

const updateById = async (id, { categoryName }) => {
  try {
    await getKnex()(tables.category)
      .update({
        categoryName,
      })
      .where(`${tables.category}.categoryID`, id);

    return { id, categoryName };
  } catch (error) {
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    await getKnex()(tables.category)
      .where(`${tables.category}.categoryID`, id)
      .del();
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in deleteById", error);
    throw error;
  }
};

module.exports = {
  getAll,
  create,
  updateById,
  getById,
  deleteById,
};
