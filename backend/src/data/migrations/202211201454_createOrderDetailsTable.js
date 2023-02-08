const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.orderDetail, (table) => {
      table.integer("orderID").unsigned().notNullable();
      table.integer("productID").unsigned().notNullable();
      table.integer("quantity").notNullable();
      table
        .foreign("orderID", "fk_orderdetail_order")
        .references(`${tables.order}.orderID`)
        .onDelete("CASCADE");
      table
        .foreign("productID", "fk_orderdetail_product")
        .references(`${tables.product}.productID`)
        .onDelete("CASCADE");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.orderDetail);
  },
};
