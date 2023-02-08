describe("products test", () => {
  beforeEach(() => {
    cy.login();
  });

  it("show products", () => {
    cy.intercept("GET", "http://localhost:9000/api/products", {
      fixture: "products.json",
    });

    cy.visit("http://localhost:3000/products");
    cy.get("[data-cy=product]").should("have.length", 5);
    cy.get("[data-cy=product_name]")
      .eq(0)
      .contains(`harry potter and the philosopher's stone`);
    cy.get("[data-cy=product_price]").eq(0).contains("15.89 EUR");
    cy.get("[data-cy=product_image]")
      .eq(0)
      .find("img")
      .should("have.attr", "src")
      .should(
        "include",
        "https://kbimages1-a.akamaihd.net/6750d058-29cb-4626-9c12-a62e816a80cc/353/569/90/False/harry-potter-and-the-philosopher-s-stone-3.jpg"
      );
  });

  it("very slow response", () => {
    cy.intercept("http://localhost:9000/api/products", (req) => {
      req.on("response", (res) => {
        res.setDelay(1000);
      });
    }).as("slowResponse");

    cy.visit("http://localhost:3000/products");
    cy.get("[data-cy=loader]").should("be.visible");
    cy.wait("@slowResponse");
    cy.get("[data-cy=loader]").should("not.exist");
  });

  it("error from backend", () => {
    cy.intercept("GET", "http://localhost:9000/api/products", {
      statusCode: 500,
      body: {
        error: "Internal server error",
      },
    });
    cy.visit("http://localhost:3000/products");
    cy.get("[data-cy=product]").should("not.exist");
    cy.get("[data-cy=error]").should("be.visible");
  });

  it("close product modal is successfull", () => {
    cy.visit("http://localhost:3000/products");
    cy.get("[data-cy=addProduct_btn]").should("exist").click();
    cy.get("[data-cy=modal_title]").should("contain", "Add product");
    cy.get("[data-cy=closeProductModal_btn]").click();
    cy.get("[data-cy=modal_title]").should("not.exist");
  });
});
