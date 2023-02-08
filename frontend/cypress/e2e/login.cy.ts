describe("login", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should succesfully log into the app", () => {
    cy.get("[data-cy=navbar_header]").should("contain", "Dashboard");
  });

  it("should successfully log out of the app", () => {
    cy.logout();

    cy.get("h1").should("exist").should("contain", "Sign In");
  });
});
