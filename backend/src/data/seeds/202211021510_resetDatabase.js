const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.category).delete();
    await knex(tables.product).delete();
    await knex(tables.order).delete();
    await knex(tables.orderDetail).delete();
  },
};
