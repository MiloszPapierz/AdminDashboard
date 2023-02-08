const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.order, (table) => {
      table.increments("orderID").primary();
      table.date("orderDate").notNullable();
      table.string("orderStatus").notNullable();
      table.string("orderLocation").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.order);
  },
};
