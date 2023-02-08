const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.order).insert([
      {
        orderID: 1,
        orderDate: new Date(2022, 10, 8),
        orderStatus: "Pending",
        orderLocation: "Corner Street 5th London",
      },
      {
        orderID: 2,
        orderDate: new Date(2022, 10, 8),
        orderStatus: "Delivered",
        orderLocation: "21 King Street London",
      },
      {
        orderID: 3,
        orderDate: new Date(2022, 10, 15),
        orderStatus: "Cancelled",
        orderLocation: "Manchester Street 6th Christchurch",
      },
      {
        orderID: 4,
        orderDate: new Date(2022, 11, 11),
        orderStatus: "Delivered",
        orderLocation: "Via Dante 18 Milan",
      },
      {
        orderID: 5,
        orderDate: new Date(2022, 11, 20),
        orderStatus: "Pending",
        orderLocation: "Boelare 13 Eeklo",
      },
    ]);
  },
};
