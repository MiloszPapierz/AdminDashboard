const { tables } = require("../../src/data/index");
const { withServer } = require("../helpers");

const data = {
  categories: [
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
  ],
};

const dataToDelete = {
  categories: [1, 2, 3],
};

describe("categories", () => {
  let request;
  let knex;
  let authHeader;

  withServer(({ knex: k, request: r, authHeader: a }) => {
    knex = k;
    request = r;
    authHeader = a;
  });

  const url = "/api/categories";

  describe("GET /api/categories", () => {
    beforeAll(async () => {
      await knex(tables.category).insert(data.categories);
    });
    afterAll(async () => {
      await knex(tables.category)
        .whereIn("categoryID", dataToDelete.categories)
        .delete();
    });

    it("should 200 and return all categories", async () => {
      const response = await request.get(url).set("Authorization", authHeader);
      expect(response.status).toBe(200);
      expect(response.body.items.length).toBeGreaterThanOrEqual(3);
      expect(response.body.items[0]).toEqual({
        categoryID: 1,
        categoryName: "Book",
      });
    });
  });

  describe("POST /api/categories", () => {
    const categoriesToDelete = [];

    afterAll(async () => {
      await knex(tables.category)
        .whereIn("categoryID", categoriesToDelete)
        .delete();
    });

    test("it should 201 and return the created category", async () => {
      const response = await request
        .post(url)
        .set("Authorization", authHeader)
        .send({ categoryName: "Shampoo" });

      expect(response.status).toBe(201);
      expect(response.body.categoryID).toBeTruthy();
      expect(response.body.categoryName).toBe("Shampoo");

      categoriesToDelete.push(response.body.categoryID);
    });

    test("it should 400 and return validation error", async () => {
      const response = await request
        .post(url)
        .set("Authorization", authHeader)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
    });
  });

  describe("PUT /api/categories/:id", () => {
    beforeAll(async () => {
      await knex(tables.category).insert(data.categories);
    });

    afterAll(async () => {
      await knex(tables.category)
        .whereIn("categoryID", dataToDelete.categories)
        .delete();
    });

    test("it should 200 and return the updated category", async () => {
      const response = await request
        .put(`${url}/${data.categories[0].categoryID}`)
        .set("Authorization", authHeader)
        .send({
          categoryName: "Books and Board Games",
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        categoryID: data.categories[0].categoryID,
        categoryName: "Books and Board Games",
      });
    });

    test("it should 400 and return body validation error", async () => {
      const response = await request
        .put(`${url}/${data.categories[0].categoryID}`)
        .set("Authorization", authHeader)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
      expect(response.body.details.body).toBeTruthy();
    });

    test("it should 400 and return params validation error", async () => {
      const response = await request
        .put(`${url}/${"fdsfa"}`)
        .set("Authorization", authHeader)
        .send({
          categoryName: "Shampoo",
        });

      expect(response.status).toBe(400);
      expect(response.body.code).toBe("VALIDATION_FAILED");
      expect(response.body.details.params).toBeTruthy();
    });

    test("it should 404 and return not_found error", async () => {
      const response = await request
        .put(`${url}/${80}`)
        .set("Authorization", authHeader)
        .send({
          categoryName: "Shampoo",
        });

      expect(response.status).toBe(404);
      expect(response.body.code).toBe("NOT_FOUND");
    });
  });

  describe("DELETE /api/categories/:id", () => {
    beforeAll(async () => {
      await knex(tables.category).insert(data.categories[0]);
    });

    test("it should 204 and return nothing", async () => {
      const response = await request
        .delete(`${url}/${data.categories[0].categoryID}`)
        .set("Authorization", authHeader);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    test("it should 400 and return validation error", async () => {
      const response = await request
        .delete(`${url}/${"fdasfa"}`)
        .set("Authorization", authHeader);

      expect(response.status).toBe(400);
      expect(response.body.code).toBeTruthy();
      expect(response.body.code).toBe("VALIDATION_FAILED");
    });
  });
});
