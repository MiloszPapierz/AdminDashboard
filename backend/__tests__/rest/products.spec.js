const { withServer } = require("../helpers");
const { tables } = require("../../src/data/index");
const path = require("path");

const data = {
  products: [
    {
      productID: 10,
      productName: "harry potter and the philosopher's stone",
      imageUrl:
        "https://kbimages1-a.akamaihd.net/6750d058-29cb-4626-9c12-a62e816a80cc/353/569/90/False/harry-potter-and-the-philosopher-s-stone-3.jpg",
      unitPrice: "15.89",
      unitsInStock: 20,
      categoryID: 20,
    },
    {
      productID: 11,
      productName: "Angels & Demons",
      imageUrl:
        "https://kbimages1-a.akamaihd.net/aad58714-db6b-45be-acbb-cc1b57bc8a84/353/569/90/False/angels-demons-1.jpg",
      unitPrice: "19.99",
      unitsInStock: 5,
      categoryID: 20,
    },
    {
      productID: 12,
      productName: "Nike T-shirt",
      imageUrl:
        "https://img01.ztat.net/article/spp-media-p1/caff0bdac4bd42e392e67a3ecbb0bcfa/b28df894778643388d36593b466a67de.jpg?imwidth=1800&filter=packshot",
      unitPrice: "29.99",
      unitsInStock: 30,
      categoryID: 20,
    },
  ],
  categories: [{ categoryID: 20, categoryName: "categoryToTest" }],
};

const dataToDelete = {
  products: [10, 11, 12],
  categories: [20],
};

describe("products", () => {
  let knex;
  let request;
  let authHeader;
  const productsToDelete = [];

  withServer(({ knex: k, request: r, authHeader: a }) => {
    knex = k;
    request = r;
    authHeader = a;
  });

  const url = "/api/products";

  describe("GET /api/products", () => {
    beforeAll(async () => {
      await knex(tables.category).insert(data.categories);
      await knex(tables.product).insert(data.products);
    });

    afterAll(async () => {
      await knex(tables.product)
        .whereIn("productID", dataToDelete.products)
        .delete();
      await knex(tables.category)
        .whereIn("categoryID", dataToDelete.categories)
        .delete();
    });

    test("should 200 and return all products", async () => {
      const response = await request.get(url).set("Authorization", authHeader);

      expect(response.status).toBe(200);
      expect(response.body.items.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("POST /api/products", () => {
    beforeAll(async () => {
      await knex(tables.category).insert(data.categories);
    });

    test("should 201 and return created product", async () => {
      const response = await request
        .post(url)
        .set("Authorization", authHeader)
        .set("Content-type", "multipart/form-data")
        .field("productName", "fairy-tale")
        .field("unitPrice", 19.99)
        .field("unitsInStock", 10)
        .field("categoryID", 20)
        .attach("image", path.resolve("src/assets/images", "./fairy-tale.jpg"));

      expect(response.status).toBe(201);
      expect(response.body.productID).toBeTruthy();
      expect(response.body.productName).toBe("fairy-tale");
      expect(response.body.unitPrice).toBe("19.99");
      expect(response.body.unitsInStock).toBe(10);
      expect(response.body.category).toEqual({
        categoryID: 20,
        categoryName: "categoryToTest",
      });
      productsToDelete.push(response.body.productID);
    });

    test("should 400 and return body validation error", async () => {
      const response = await request
        .post(url)
        .set("Authorization", authHeader)
        .set("Content-type", "multipart/form-data")
        .field("unitPrice", 19.99)
        .field("unitsInStock", 10)
        .field("categoryID", 20)
        .attach("image", path.resolve("src/assets/images", "./fairy-tale.jpg"));

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
      expect(response.body.details.body).toBeTruthy();
    });
  });

  describe("DELETE /api/products/:id", () => {
    afterAll(async () => {
      await knex(tables.category)
        .whereIn("categoryID", dataToDelete.categories)
        .delete();
    });

    test("it should 204 and return nothing", async () => {
      const response = await request
        .delete(`${url}/${productsToDelete[0]}`)
        .set("Authorization", authHeader);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    test("it should 400 and return params validation error", async () => {
      const response = await request
        .delete(`${url}/${"fdsafda"}`)
        .set("Authorization", authHeader);

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
      expect(response.body.details.params).toBeTruthy();
    });
  });

  describe("PUT /api/products/:id", () => {
    beforeAll(async () => {
      await knex(tables.category).insert(data.categories);
      await knex(tables.product).insert(data.products);
    });

    afterAll(async () => {
      await knex(tables.product)
        .whereIn("productID", dataToDelete.products)
        .delete();
      await knex(tables.category)
        .whereIn("categoryID", dataToDelete.categories)
        .delete();
    });

    test("it should 200 and return updated product", async () => {
      const response = await request
        .put(`${url}/${data.products[0].productID}`)
        .set("Authorization", authHeader)
        .set("Content-type", "multipart/form-data")
        .field("productName", "harry potter and the philosopher's stone")
        .field("unitPrice", 12.99)
        .field("unitsInStock", 5)
        .field("categoryID", 20);

      expect(response.status).toBe(200);
      expect(response.body.productID).toBe(10);
      expect(response.body.productName).toBe(
        "harry potter and the philosopher's stone"
      );
      expect(response.body.unitPrice).toBe("12.99");
      expect(response.body.unitsInStock).toBe(5);
      expect(response.body.imageUrl).toBeTruthy();
      expect(response.body.category).toEqual({
        categoryID: 20,
        categoryName: "categoryToTest",
      });
    });

    test("it should 404 and return not_found error", async () => {
      const response = await request
        .put(`${url}/${"80"}`)
        .set("Authorization", authHeader)
        .set("Content-type", "multipart/form-data")
        .field("productName", "harry potter and the philosopher's stone")
        .field("unitPrice", 12.99)
        .field("unitsInStock", 5)
        .field("categoryID", 20);

      expect(response.status).toBe(404);
      expect(response.body.code).toBe("NOT_FOUND");
    });

    test("it should 400 and return body validation error", async () => {
      const response = await request
        .put(`${url}/${"10"}`)
        .set("Authorization", authHeader)
        .set("Content-type", "multipart/form-data")
        .field("productName", "harry potter and the philosopher's stone")
        .field("unitsInStock", 5)
        .field("categoryID", 20);

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
      expect(response.body.details.body).toBeTruthy();
    });

    test("it should 400 and return params validation error", async () => {
      const response = await request
        .put(`${url}/${"fea"}`)
        .set("Authorization", authHeader)
        .set("Content-type", "multipart/form-data")
        .field("productName", "harry potter and the philosopher's stone")
        .field("unitsInStock", 5)
        .field("unitPrice", 9.99)
        .field("categoryID", 20);

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
      expect(response.body.details.params).toBeTruthy();
    });

    test("it should 500 and return foreign key constraint", async () => {
      const response = await request
        .put(`${url}/${data.products[0].productID}`)
        .set("Authorization", authHeader)
        .set("Content-type", "multipart/form-data")
        .field("productName", "harry potter and the philosopher's stone")
        .field("unitsInStock", 5)
        .field("unitPrice", 9.99)
        .field("categoryID", 120);

      expect(response.status).toBe(500);
      expect(response.body.code).toBe("ER_NO_REFERENCED_ROW_2");
    });
  });
});
