const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.category).insert([
      {
        categoryID: 1,
        categoryName: "Book",
      },
      {
        categoryID: 2,
        categoryName: "T-shirt",
      },
      {
        categoryID: 3,
        categoryName: "Shoes",
      },
    ]);
  },
};
