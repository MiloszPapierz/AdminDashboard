const {
  destroyDatabaseConnection,
  getKnex,
  tables,
} = require("../src/data/index");

module.exports = async () => {
  await getKnex()(tables.orderDetail).delete();
  await getKnex()(tables.order).delete();
  await getKnex()(tables.product).delete();
  await getKnex()(tables.category).delete();

  await destroyDatabaseConnection();
};
