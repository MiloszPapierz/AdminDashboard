const { withServer } = require("../helpers");
const { tables } = require("../../src/data/index");

const data = {
  orders: [
    {
      orderID: 1,
      orderDate: new Date(2022, 10, 7),
      orderStatus: "Pending",
      orderLocation: "Corner Street 5th London",
    },
    {
      orderID: 3,
      orderDate: new Date(2022, 10, 14),
      orderStatus: "Cancelled",
      orderLocation: "Manchester Street 6th Christchurch",
    },
  ],
  products: [
    {
      productID: 1,
      productName: "harry potter and the philosopher's stone",
      imageUrl:
        "https://kbimages1-a.akamaihd.net/6750d058-29cb-4626-9c12-a62e816a80cc/353/569/90/False/harry-potter-and-the-philosopher-s-stone-3.jpg",
      unitPrice: "15.89",
      unitsInStock: 20,
      categoryID: 10,
    },
    {
      productID: 2,
      productName: "Angels & Demons",
      imageUrl:
        "https://kbimages1-a.akamaihd.net/aad58714-db6b-45be-acbb-cc1b57bc8a84/353/569/90/False/angels-demons-1.jpg",
      unitPrice: "19.99",
      unitsInStock: 5,
      categoryID: 10,
    },
  ],
  orderDetails: [
    {
      orderID: 1,
      productID: 1,
      quantity: 2,
    },
    {
      orderID: 1,
      productID: 2,
      quantity: 1,
    },
    {
      orderID: 3,
      productID: 1,
      quantity: 1,
    },
  ],
  categories: [{ categoryID: 10, categoryName: "Books" }],
};

const dataToDelete = {
  categories: [10],
  products: [1, 2],
  orders: [1, 3],
  orderDetails: [1, 3],
};

describe("orders", () => {
  let knex;
  let authHeader;
  let request;

  withServer(({ knex: k, request: r, authHeader: a }) => {
    knex = k;
    request = r;
    authHeader = a;
  });

  const url = "/api/orders";

  describe("GET /api/orders", () => {
    beforeAll(async () => {
      await knex(tables.category).insert(data.categories);
      await knex(tables.product).insert(data.products);
      await knex(tables.order).insert(data.orders);
      await knex(tables.orderDetail).insert(data.orderDetails);
    });
    afterAll(async () => {
      await knex(tables.orderDetail)
        .whereIn("orderID", dataToDelete.orderDetails)
        .delete();
      await knex(tables.product)
        .whereIn("productID", dataToDelete.products)
        .delete();
      await knex(tables.order).whereIn("orderID", dataToDelete.orders).delete();
      await knex(tables.category)
        .whereIn("categoryID", dataToDelete.categories)
        .delete();
    });

    test("should 200 and return all orders", async () => {
      const response = await request.get(url).set("Authorization", authHeader);

      expect(response.status).toBe(200);
      expect(response.body.items.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("PUT /api/orders/:id", () => {
    beforeAll(async () => {
      await knex(tables.order).insert(data.orders);
      await knex(tables.category).insert(data.categories);
      await knex(tables.product).insert(data.products);
      await knex(tables.orderDetail).insert(data.orderDetails);
    });

    afterAll(async () => {
      await knex(tables.orderDetail)
        .whereIn("orderID", dataToDelete.orderDetails)
        .delete();
      await knex(tables.product)
        .whereIn("productID", dataToDelete.products)
        .delete();
      await knex(tables.order).whereIn("orderID", dataToDelete.orders).delete();
      await knex(tables.category)
        .whereIn("categoryID", dataToDelete.categories)
        .delete();
    });

    test("it should 200 and return updated order", async () => {
      const response = await request
        .put(`${url}/${data.orders[0].orderID}`)
        .set("Authorization", authHeader)
        .send({
          orderDate: "2022-11-07T23:00:00.000Z",
          orderStatus: "Delivered",
          orderLocation: "Corner Street 5th London",
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        orderID: 1,
        orderDate: "2022-11-07T23:00:00.000Z",
        orderStatus: "Delivered",
        orderLocation: "Corner Street 5th London",
        products: [
          {
            productID: 1,
            productName: "harry potter and the philosopher's stone",
            imageUrl:
              "https://kbimages1-a.akamaihd.net/6750d058-29cb-4626-9c12-a62e816a80cc/353/569/90/False/harry-potter-and-the-philosopher-s-stone-3.jpg",
            unitPrice: "15.89",
            unitsInStock: 20,
            quantity: 2,
            categoryID: 10,
          },
          {
            productID: 2,
            productName: "Angels & Demons",
            imageUrl:
              "https://kbimages1-a.akamaihd.net/aad58714-db6b-45be-acbb-cc1b57bc8a84/353/569/90/False/angels-demons-1.jpg",
            unitPrice: "19.99",
            unitsInStock: 5,
            quantity: 1,
            categoryID: 10,
          },
        ],
      });
    });

    test("it should 404 and return not_found error", async () => {
      const response = await request
        .put(`${url}/${99}`)
        .set("Authorization", authHeader)
        .send({
          orderDate: "2022-11-07T23:00:00.000Z",
          orderStatus: "Delivered",
          orderLocation: "Corner Street 5th London",
        });

      expect(response.status).toBe(404);
      expect(response.body.code).toBe("NOT_FOUND");
    });

    test("it should 400 and return body validation error", async () => {
      const response = await request
        .put(`${url}/${data.orders[0].orderID}`)
        .set("Authorization", authHeader)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
      expect(response.body.details.body).toBeTruthy();
    });

    test("it should 400 and return params validation error", async () => {
      const response = await request
        .put(`${url}/${"fdafda"}`)
        .set("Authorization", authHeader)
        .send({
          orderDate: "2022-11-07T23:00:00.000Z",
          orderStatus: "Delivered",
          orderLocation: "Corner Street 5th London",
        });

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
      expect(response.body.details.params).toBeTruthy();
    });
  });

  describe("DELETE /api/orders/:id", () => {
    beforeAll(async () => {
      await knex(tables.category).insert(data.categories);
      await knex(tables.product).insert(data.products[0]);
      await knex(tables.order).insert(data.orders[1]);
      await knex(tables.orderDetail).insert(data.orderDetails[2]);
    });

    afterAll(async () => {
      await knex(tables.product)
        .where("productID", data.products[0].productID)
        .delete();
      await knex(tables.category)
        .where("categoryID", data.categories[0].categoryID)
        .delete();
    });

    test("it should 204 and return nothing", async () => {
      const response = await request
        .delete(`${url}/${data.orders[1].orderID}`)
        .set("Authorization", authHeader);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    test("it should 400 and return validation error", async () => {
      const response = await request
        .delete(`${url}/${"fdfda"}`)
        .set("Authorization", authHeader);

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
    });
  });
});
