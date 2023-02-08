const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.product, (table) => {
      table.increments("productID");
      table.string("productName").notNullable();
      table.string("imageUrl", 500);
      table.decimal("unitPrice").notNullable();
      table.integer("unitsInStock").notNullable();
      table.integer("categoryID").unsigned().notNullable();
      table
        .foreign("categoryID", "fk_product_category")
        .references(`${tables.category}.categoryID`)
        .onDelete("CASCADE");
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.product);
  },
};
