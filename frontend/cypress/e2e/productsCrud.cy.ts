//the reason for putting this in different test file is the fact that auth0 will throw error response if we test too many
// at the same time
describe("Crud operations for products", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Add product without image is successfull", () => {
    //visit products
    cy.visit("http://localhost:3000/products");

    //go to form and fill input fields
    cy.get("[data-cy=addProduct_btn]").should("exist").click();
    cy.get("[data-cy=modal_title]").should("contain", "Add product");
    cy.get("[data-cy=productName_input]").type("Fairy Tale");
    cy.get("[data-cy=unitPrice_input]").type("16.99");
    cy.get("[data-cy=unitsInStock_input]").type("10");
    cy.get("[data-cy=category_input]").select("Book");
    cy.get("[data-cy=productModalAction_btn]")
      .should("contain", "Add Product")
      .click();

    cy.get("[data-cy=product]").should("have.length", 6);
  });

  it("Remove product without image", () => {
    cy.visit("http://localhost:3000/products");

    cy.get("[data-cy=productDelete_btn]").eq(2).click();
  });

  it("Add product with image is successfull", () => {
    //visit products page
    cy.visit("http://localhost:3000/products");

    //fill input fiels
    cy.get("[data-cy=addProduct_btn]").should("exist").click();
    cy.get("[data-cy=modal_title]").should("contain", "Add product");
    cy.get("[data-cy=productName_input]").type("Fairy Tale");
    cy.get("[data-cy=unitPrice_input]").type("16.99");
    cy.get("[data-cy=unitsInStock_input]").type("10");
    cy.get("[data-cy=category_input]").select("Book");
    cy.get("[data-cy=image_input]").selectFile(
      "cypress/fixtures/fairy-tale.jpg"
    );
    cy.get("[data-cy=form]").find("img").should("exist");

    //put everything in formdata
    const formData = new FormData();
    formData.append("productName", "Fairy Tale");
    formData.append("unitPrice", "16.99");
    formData.append("categoryID", "1");
    formData.append("unitsInStock", "10");
    cy.fixture("fairy-tale.jpg", "binary").then((image) => {
      const blob = Cypress.Blob.binaryStringToBlob(image);
      const file = new File([blob], "Test", { type: "image/png" });
      formData.append("image", file);
    });

    //send request to backend -> we don't click on the button but we will send request and revisit the page
    const token = JSON.parse(
      localStorage.getItem(
        "@@auth0spajs@@::f257mBR3UDgKJZFiHqFFi97YNLELdb6W::https://dashboard.milosz-hogent.be::openid profile email offline_access"
      ) as string
    ).body.access_token;
    cy.request({
      method: "POST",
      url: "http://localhost:9000/api/products",
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    cy.visit("http://localhost:3000/products");
    cy.get("[data-cy=product]").should("have.length", 6);
    cy.get("[data-cy=product_image]")
      .eq(2)
      .find("img")
      .should("have.attr", "src")
      .should("not.include", "http://localhost:3000/no-image.webp");
  });

  it("Update product is successfull", () => {
    cy.visit("http://localhost:3000/products");

    cy.get("[data-cy=productUpdate_btn]").eq(2).click();

    cy.get("[data-cy=modal_title]").should("contain", "Update Product");

    cy.get("[data-cy=productName_input]")
      .should("have.value", "Fairy Tale")
      .type(" v2");
    cy.get("[data-cy=unitPrice_input]").should("have.value", "16.99");
    cy.get("[data-cy=unitPrice_input]").clear().type("19.99");
    cy.get("[data-cy=unitsInStock_input]").should("have.value", "10");
    cy.get("[data-cy=category_input]").should("have.value", "1");
    cy.get("[data-cy=form]").find("img").should("exist");

    cy.get("[data-cy=productModalAction_btn]")
      .should("contain", "Update Product")
      .click();

    cy.get("[data-cy=product]")
      .eq(2)
      .get("[data-cy=product_name]")
      .should("contain", "Fairy Tale v2");
    cy.get("[data-cy=product]")
      .eq(2)
      .get("[data-cy=product_price]")
      .should("contain", "19.99");
  });

  it("Remove product with image", () => {
    cy.visit("http://localhost:3000/products");

    cy.get("[data-cy=productDelete_btn]").eq(2).click();
  });

  it("Add product with empty fields is not successfull", () => {
    cy.visit("http://localhost:3000/products");

    cy.get("[data-cy=addProduct_btn]").should("exist").click();
    cy.get("[data-cy=modal_title]").should("contain", "Add product");

    cy.get("[data-cy=productModalAction_btn]").click();
    cy.get("[data-cy=product_error]")
      .eq(0)
      .should("contain", "Productname is required");
    cy.get("[data-cy=product_error]")
      .eq(1)
      .should("contain", "Unitprice is required");
    cy.get("[data-cy=category_error]")
      .eq(0)
      .should("contain", "Category is required");
  });
});
