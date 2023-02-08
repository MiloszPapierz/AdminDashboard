const { tables } = require("../index");

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.category, (table) => {
      table.increments("categoryID");
      table.string("categoryName").notNullable();
    });
  },
  down: (knex) => {
    return knex.schema().dropTableIfExists(tables.category);
  },
};
