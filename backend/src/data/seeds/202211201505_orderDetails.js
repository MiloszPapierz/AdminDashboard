const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.orderDetail).insert([
      {
        orderID: 1,
        productID: 1,
        quantity: 2,
      },
      {
        orderID: 1,
        productID: 3,
        quantity: 1,
      },
      {
        orderID: 3,
        productID: 2,
        quantity: 1,
      },
      {
        orderID: 4,
        productID: 5,
        quantity: 3,
      },
      {
        orderID: 4,
        productID: 3,
        quantity: 4,
      },
      {
        orderID: 4,
        productID: 2,
        quantity: 2,
      },
      {
        orderID: 5,
        productID: 1,
        quantity: 1,
      },
    ]);
  },
};
