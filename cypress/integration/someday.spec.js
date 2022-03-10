/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should should the homepage with 2 default accounts", () => {
    cy.contains("Joris")
      .parent("tr")
      .within(() => {
        cy.contains("1000.00");
      });
    cy.contains("Pim")
      .parent("tr")
      .within(() => {
        cy.contains("2000.00");
      });
  });

  it("should add a new account", () => {
    cy.contains("Create account").click();
    cy.get("input[name=name]").type("Tom");
    cy.get("input[name=balance]").type("500");
    cy.contains("button", "Create account").click();

    // Redirected to home page
    cy.contains("Account overview");
    cy.contains("Tom")
      .parent("tr")
      .within(() => {
        cy.contains("500.00");
      });
  });

  it("should transfer money from one account to another", () => {
    transferMoney(100);

    cy.contains("Joris")
      .parent("tr")
      .within(() => {
        cy.contains("900.00");
      });
    cy.contains("Pim")
      .parent("tr")
      .within(() => {
        cy.contains("2100.00");
      });
  });

  it("should update the transaction log when a transfer is done", () => {
    transferMoney(400);

    cy.contains("Transactions").click();
    cy.contains("Transactions log");
    cy.contains("400.00");
  });
});

function transferMoney(amount) {
  cy.contains("Transfer funds").click();
  cy.get("select#from_account").select("Joris");
  cy.get("select#to_account").select("Pim");
  cy.get('input[name="amount"]').type(amount);
  cy.contains("button", "Transfer").click();
}
