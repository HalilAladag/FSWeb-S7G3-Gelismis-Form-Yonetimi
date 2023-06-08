describe("Form Testleri", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
    });

    it("İsim inputunu doğru şekilde kabul eder", () => {
        cy.get('input[name="name"]').type("testname").should("have.value", "testname");
    });

    it("Girilen metin sağlanan adı içerir", () => {
        cy.get('input[name="name"]').type("testname");
        cy.get('input[name="name"]').should("contain.value", "testname");
    });

    it("Email inputunu doğru şekilde kabul eder", () => {
        cy.get('input[name="email"]').type("test@mail.com").should("have.value", "test@mail.com");
    });

    it("Şifre inputunu doğru şekilde kabul eder", () => {
        cy.get('input[name="password"]').type("12345678").should("have.value", "12345678");
    });

    it("Kullanım koşulları kutusunu işaretleyebilir", () => {
        cy.get('input[name="terms"]').check().should("be.checked");
    });

    it("Formu gönderebilir", () => {
        cy.get('input[name="name"]').type("Test");
        cy.get('input[name="lastname"]').type("Name");
        cy.get('input[name="email"]').type("test@mail.com");
        cy.get('input[name="password"]').type("12345678");
        cy.get('input[name="terms"]').check();

        cy.get('button[type="submit"]').should("be.enabled").click();

        cy.get("p").should("contain.text", "Test");
    });

    it("Boş input kontrolü", () => {
        cy.get('input[name="name"]').should("have.value", "");
        cy.get('input[name="lastname"]').should("have.value", "");
        cy.get('input[name="email"]').should("have.value", "");
        cy.get('input[name="password"]').should("have.value", "");
        cy.get('input[name="terms"]').should("not.be.checked");

        cy.get('button[type="submit"]').should("be.disabled");
    });
});
