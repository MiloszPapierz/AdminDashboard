const { getKnex, tables } = require("../data/index");
const { getLogger } = require("../core/logging");

const formatProduct = ({ categoryID, categoryName, ...rest }) => {
  return {
    ...rest,
    category: {
      categoryID,
      categoryName,
    },
  };
};

const getAll = async () => {
  const products = await getKnex()(tables.product)
    .select()
    .join(
      tables.category,
      `${tables.product}.categoryID`,
      "=",
      `${tables.category}.categoryID`
    );

  return products.map(formatProduct);
};

const getById = async (id) => {
  const product = await getKnex()(tables.product)
    .select()
    .join(
      tables.category,
      `${tables.product}.categoryID`,
      "=",
      `${tables.category}.categoryID`
    )
    .where(`${tables.product}.productID`, id)
    .first();

  return product && formatProduct(product);
};

const create = async ({
  productName,
  imageUrl,
  unitPrice,
  unitsInStock = 0,
  categoryID,
}) => {
  try {
    const [id] = await getKnex()(tables.product).insert({
      productName,
      imageUrl,
      unitPrice,
      unitsInStock,
      categoryID,
    });

    return id;
  } catch (error) {
    logger = getLogger();
    logger.error("Error while creating a product", error);
    throw error;
  }
};

const updateById = async (
  id,
  { productName, imageUrl, unitPrice, unitsInStock = 0, categoryID }
) => {
  try {
    await getKnex()(tables.product)
      .update({
        productName,
        ...(imageUrl ? { imageUrl } : {}),
        unitPrice,
        unitsInStock,
        categoryID,
      })
      .where(`${tables.product}.productID`, id);

    return id;
  } catch (error) {
    logger = getLogger();
    logger.error("Error in updateById", error);
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const rowsDeleted = await getKnex()(tables.product)
      .where(`${tables.product}.productID`, id)
      .del();

    return rowsDeleted > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in deleteById", error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
