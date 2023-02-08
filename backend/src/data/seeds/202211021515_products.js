const { tables } = require("../index");

module.exports = {
  seed: async (knex) => {
    await knex(tables.product).insert([
      {
        productID: 1,
        productName: "harry potter and the philosopher's stone",
        imageUrl:
          "https://kbimages1-a.akamaihd.net/6750d058-29cb-4626-9c12-a62e816a80cc/353/569/90/False/harry-potter-and-the-philosopher-s-stone-3.jpg",
        unitPrice: 15.89,
        UnitsInStock: 20,
        categoryID: 1,
      },
      {
        productID: 2,
        productName: "Angels & Demons",
        imageUrl:
          "https://kbimages1-a.akamaihd.net/aad58714-db6b-45be-acbb-cc1b57bc8a84/353/569/90/False/angels-demons-1.jpg",
        unitPrice: 19.99,
        UnitsInStock: 5,
        categoryID: 1,
      },
      {
        productID: 3,
        productName: "Nike T-shirt",
        imageUrl:
          "https://img01.ztat.net/article/spp-media-p1/caff0bdac4bd42e392e67a3ecbb0bcfa/b28df894778643388d36593b466a67de.jpg?imwidth=1800&filter=packshot",
        unitPrice: 29.99,
        UnitsInStock: 30,
        categoryID: 2,
      },
      {
        productID: 4,
        productName: "Adidas T-shirt",
        imageUrl:
          "https://cdn.kleding.nl/L552933283/adidas-t-shirt-met-korte-mouwen.jpg",
        unitPrice: 30.0,
        UnitsInStock: 8,
        categoryID: 2,
      },
      {
        productID: 5,
        productName: "Nike Air Force",
        imageUrl:
          "https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/e125b578-4173-401a-ab13-f066979c8848/air-force-1-kinderschoen-65f76v.png",
        unitPrice: 99.99,
        UnitsInStock: 12,
        categoryID: 3,
      },
    ]);
  },
};
