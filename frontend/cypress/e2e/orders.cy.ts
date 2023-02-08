describe("orders test", () => {
  beforeEach(() => {
    cy.login();
  });

  it("show orders", () => {
    cy.intercept("GET", "http://localhost:9000/api/orders", {
      fixture: "orders.json",
    });

    cy.visit("http://localhost:3000/orders");
    cy.get("[data-cy=order]").should("have.length", 4);
    cy.get("[data-cy=orderID]").eq(0).should("have.text", "1");
    cy.get("[data-cy=orderDate]").eq(0).should("have.text", "8/11/2022");
    cy.get("[data-cy=orderLocation]")
      .eq(0)
      .should("have.text", "Corner Street 5th London");
    cy.get("[data-cy=amount]").eq(0).should("have.text", "61.77 EUR");
    cy.get("[data-cy=orderStatus]").eq(0).should("have.text", "Pending");
  });

  it("very slow response", () => {
    cy.intercept("http://localhost:9000/api/orders", (req) => {
      req.on("response", (res) => {
        res.setDelay(1000);
      });
    }).as("slowResponse");

    cy.visit("http://localhost:3000/orders");
    cy.get("[data-cy=loader]").should("be.visible");
    cy.wait("@slowResponse");
    cy.get("[data-cy=loader]").should("not.exist");
  });

  it("error from backend", () => {
    cy.intercept("GET", "http://localhost:9000/api/orders", {
      statusCode: 500,
      body: {
        error: "Internal server error",
      },
    });

    cy.visit("http://localhost:3000/orders");
    cy.get("[data-cy=order]").should("have.length", 0);
    cy.get("[data-cy=error]").should("be.visible");
  });

  it("orders modal close successfully", () => {
    cy.visit("http://localhost:3000/orders");
    cy.get("[data-cy=order]")
      .eq(0)
      .get("[data-cy=orderUpdate_btn]")
      .eq(0)
      .click();
    cy.get("[data-cy=orderModal_title]").should("have.text", "Update Order");
    cy.get("[data-cy=closeOrderModal_btn]").click();
    cy.get("[data-cy=orderModal_title]").should("not.exist");
  });

  it("Editing order", () => {
    cy.intercept("PUT", "http://localhost:9000/api/orders/1", {
      fixture: "createdOrder.json",
    }).as("putOrder");
    cy.intercept("GET", "http://localhost:9000/api/orders", {
      fixture: "orders.json",
      times: 1,
    }).as("orders");

    cy.visit("http://localhost:3000/orders");
    cy.get("[data-cy=orderUpdate_btn]").eq(0).should("exist").click();
    cy.get("[data-cy=orderModal_title]").should("have.text", "Update Order");
    cy.get("[data-cy=orderStatus_input]").should("have.value", "PENDING");
    cy.get("[data-cy=orderStatus_input]").select("DELIVERED");
    cy.intercept("GET", "http://localhost:9000/api/orders", {
      fixture: "orders2.json",
      times: 1,
      statusCode: 200,
    }).as("orders2");
    cy.get("[data-cy=updateOrder_btn]").click();

    cy.wait("@orders2").its("response.statusCode").should("eq", 200);

    cy.get("[data-cy=orderStatus]").eq(0).should("have.text", "Delivered");
  });

  it("Removing order works", () => {
    cy.intercept("GET", "http://localhost:9000/api/orders", {
      fixture: "orders.json",
    });
    cy.intercept("DELETE", "http://localhost:9000/api/orders/1", {
      statusCode: 204,
    }).as("deleteOrder");
    cy.visit("http://localhost:3000/orders");
    cy.get("[data-cy=orderDelete_btn]").eq(0).click();
  });
});
