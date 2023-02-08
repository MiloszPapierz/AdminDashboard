const orderRepository = require("../repository/order");
const { getLogger } = require("../core/logging");
const ServiceError = require("../core/serviceError");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

const getAll = async () => {
  debugLog("Fetching all orders");

  const orders = await orderRepository.getAll();

  return {
    items: orders,
    count: orders.length,
  };
};

const getById = async (id) => {
  debugLog(`Fetching order with id: ${id}`);

  const order = await orderRepository.getById(id);

  if (!order) {
    throw ServiceError.notFound(`There is no order with id ${id}`, { id });
  }

  return order;
};

const updateById = async (id, order) => {
  debugLog(`Updating order with id: ${id}`);

  await orderRepository.updateById(id, order);
  return getById(id);
};

const deleteById = async (id) => {
  debugLog(`Removing order with id: ${id}`);

  return await orderRepository.deleteById(id);
};

module.exports = {
  getAll,
  deleteById,
  updateById,
};
