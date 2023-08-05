describe('smoke test', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
})

describe('Pagination Navigation', () => {
  it('should navigate to the next page and then back to the previous page', () => {
    cy.visit('/'); // Change the URL as needed
    
    // Click on the next page link
    cy.get('.pagination a:contains("Next Page")').click();
    
    // Ensure that the URL has changed to reflect the next page
    cy.url().should('include', '/?page=2');
    
    // Click on the previous page link
    cy.get('.pagination a:contains("Previous Page")').click();
    
    // Ensure that the URL has changed back to the previous page
    cy.url().should('not.include', '/?page=2');
  });
});

describe("Post Details", () => {
  it("should navigate to a post's details", () => {
    cy.visit("/");

    cy.get(".post:first-child").click();

    // Assuming your Post component displays post details
    cy.url().should('include', '/p');
  });
});

describe("Blog Page", () => {
  it("should display correct page title and posts", () => {
    cy.visit("/"); // Assuming your page is served on the root URL

    cy.get("h1").should("contain", "Public Feed");

    cy.get(".post").should("have.length.greaterThan", 0);
  });
});

// describe("Login Page", () => {
//   it("should log in successfully with valid credentials", () => {
//     cy.visit("/login");

//     cy.get('input[type="text"]').type("alssamit@gmail.com");
//     cy.get('input[type="password"]').type("123");
//     cy.get('input[type="submit"]').click();

//     cy.url().should("not.include", "/login");
//     // You can add more assertions to validate successful login behavior
//   });
// });

describe("Login Page", () => {
  it("should show an alert for invalid login attempt", () => {
    cy.visit("/login");

    cy.get('input[type="text"]').type("invalid@email.com");
    cy.get('input[type="password"]').type("wrongpassword");
    cy.get('input[type="submit"]').click();

    cy.on("window:alert", (alertText) => {
      expect(alertText).to.include("Invalid credentials");
    });

    cy.url().should("include", "/login");
  });
});

describe("Signup Page", () => {
  it("should navigate back to home page", () => {
    cy.visit("/signup");

    cy.get(".back").click();

    cy.url().should("include", "/");
  });
});


