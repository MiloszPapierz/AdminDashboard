describe("Dashboard test", () => {
  beforeEach(() => {
    cy.login();
    cy.intercept("GET", "http://localhost:9000/api/products", {
      fixture: "products.json",
    });
    cy.intercept("GET", "http://localhost:9000/api/orders", {
      fixture: "orders.json",
    });
    cy.intercept("GET", "http://localhost:9000/api/categories", {
      fixture: "categories.json",
    });
  });

  it("Show dashboard page", () => {
    cy.get("[data-cy=dashboard_card]").should("have.length", 4);
    cy.get("[data-cy=card_body]").eq(0).should("have.text", 5);
    cy.get("[data-cy=card_body]").eq(1).should("have.text", 2);
    cy.get("[data-cy=card_body]").eq(2).should("have.text", "557.56 EUR");

    cy.get("[data-cy=dashboardChart_title]").should(
      "have.text",
      "Number of orders"
    );
    cy.get("[data-cy=chart]").should("exist");

    cy.get("[data-cy=categories_title]").should("have.text", "Categories");
    cy.get("[data-cy=category]").should("have.length", 3);
  });

  it("Slow response shows loading component", () => {
    cy.intercept("GET", "http://localhost:9000/api/categories", {
      fixture: "categories.json",
      delay: 1000,
    }).as("slowResponse");

    cy.get("[data-cy=loader]").should("be.visible");
    cy.wait("@slowResponse");
    cy.get("[data-cy=loader]").should("not.exist");
  });

  it("Error in one request shows error", () => {
    cy.intercept("GET", "http://localhost:9000/api/categories", {
      fixture: "categories.json",
      statusCode: 400,
    });

    cy.get("[data-cy=error]").should("be.visible");
  });

  it("Remove one cateogry removes category", () => {
    cy.intercept("DELETE", "http://localhost:9000/api/categories/1", {
      statusCode: 204,
    });

    cy.get("[data-cy=category]").should("have.length", 3);
    cy.get("[data-cy=removeCategory_btn]").eq(0).should("exist").click();
    cy.get("[data-cy=category]").should("have.length", 2);
  });

  it("Creating category creates a category", () => {
    cy.intercept("POST", "http://localhost:9000/api/categories", {
      fixture: "newCategory.json",
    });

    cy.get("[data-cy=category]").should("have.length", 3);
    cy.get("[data-cy=category_input]").type("Shampoo");
    cy.get("[data-cy=addCategory_btn]").should("exist").click();
    cy.get("[data-cy=category]").should("have.length", 4);
  });

  it("Creating category with length less than 3 shows error", () => {
    cy.get("[data-cy=category]").should("have.length", 3);
    cy.get("[data-cy=category_input]").type("Sh");
    cy.get("[data-cy=addCategory_btn]").should("exist").click();
    cy.get("[data-cy=category_error]")
      .should("be.visible")
      .should("have.text", "Category should have atleast 3 chars");
    cy.get("[data-cy=category]").should("have.length", 3);
  });
});
