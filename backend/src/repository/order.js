const { getKnex, tables } = require("../data/index");
const { getLogger } = require("../core/logging");

const formatProduct = ({
  productID,
  productName,
  imageUrl,
  unitPrice,
  unitsInStock,
  categoryID,
  quantity,
  ...rest
}) => {
  return {
    ...rest,
    product: {
      productID,
      productName,
      imageUrl,
      unitPrice,
      unitsInStock,
      quantity,
      categoryID,
    },
  };
};

const getAll = async () => {
  let orders = await getKnex()(tables.order)
    .select()
    .join(
      tables.orderDetail,
      `${tables.orderDetail}.orderID`,
      "=",
      `${tables.order}.orderID`
    )
    .join(
      tables.product,
      `${tables.product}.productID`,
      "=",
      `${tables.orderDetail}.productID`
    );
  orders = orders.map(formatProduct);
  const outputOrders = [];
  orders.forEach((order) => {
    if (outputOrders.filter((o) => o.orderID === order.orderID).length == 0) {
      outputOrders.push({ ...order });
      nodig = outputOrders.find((o) => o.orderID === order.orderID);
      nodig.products = [];
      nodig.products.push(nodig.product);
      delete nodig.product;
    } else {
      nodig = outputOrders.find((o) => o.orderID === order.orderID);
      nodig.products.push(order.product);
      delete nodig.product;
    }
  });
  return outputOrders;
};

const getById = async (id) => {
  let order = await getKnex()(tables.order)
    .join(
      tables.orderDetail,
      `${tables.orderDetail}.orderID`,
      "=",
      `${tables.order}.orderID`
    )
    .join(
      tables.product,
      `${tables.product}.productID`,
      "=",
      `${tables.orderDetail}.productID`
    )
    .where(`${tables.order}.orderID`, id);
  order = order.map(formatProduct);
  products = [];
  order.forEach((o) => {
    products.push(o.product);
    delete o.product;
  });

  return order.length > 0 ? { ...order[0], products } : null;
};

const updateById = async (id, { orderDate, orderStatus, orderLocation }) => {
  try {
    await getKnex()(tables.order)
      .update({
        orderDate,
        orderStatus,
        orderLocation,
      })
      .where(`${tables.order}.orderID`, id);

    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error("Error in order updateByID", error);
  }
};

const deleteById = async (id) => {
  try {
    await getKnex()(tables.orderDetail)
      .where(`${tables.orderDetail}.orderID`, id)
      .del();
    await getKnex()(tables.order).where(`${tables.order}.orderID`, id).del();
  } catch (error) {
    const logger = getLogger();
    logger.error(`Error while deleting order with id: ${id}`, error);
  }
};

module.exports = {
  getAll,
  getById,
  updateById,
  deleteById,
};
