import request from "supertest";

const BASE_URL =
  process.env.BACKEND_DEVELOPMENT_URL || "http://localhost:3333/graphql";

const _TEST_DESCRIPTION_NAME = "Auth API";

describe(_TEST_DESCRIPTION_NAME + " - defaultRegister (e2e)", () => {
  it("should fail to register a user with invalid userName", async () => {
    const mutation = `
      mutation {
        defaultRegister(
          input: {
            userName: "invalid@user"
            displayName: "testDisplayName123"
            email: "invalidUserName@example.com"
            password: "Test1234!"
          }
        ) {
          accessToken
          expiresIn
          language
          timeZone
          theme
        }
      }
    `;

    const response = await request(BASE_URL)
      .post("/")
      .send({ query: mutation });
    const originalError = response.body.errors[0].extensions.originalError;
    console.log(originalError);
    expect(response.status).toBe(200);
    expect(response.body.errors).toBeDefined();
  }, 1000);

  it("should fail to register a user with invalid displayName", async () => {
    const mutation = `
      mutation {
        defaultRegister(
          input: {
            userName: "testUserName123"
            displayName: "test_display_name 123"
            email: "testuser@example.com"
            password: "Test1234!"
          }
        ) {
          accessToken
          expiresIn
          language
          timeZone
          theme
        }
      }
    `;
    const response = await request(BASE_URL)
      .post("/")
      .send({ query: mutation });
    const originalError = response.body.errors[0].extensions.originalError;
    console.log(originalError);
    expect(response.status).toBe(200);
    expect(response.body.errors).toBeDefined();
  }, 1000);

  it("should fail to register a user with invalid email", async () => {
    const mutation = `
      mutation {
        defaultRegister(
          input: {
            userName: "testUserName123"
            displayName: "testDisplayName123"
            email: "testuser.com"
            password: "Test1234!"
          }
        ) {
          accessToken
          expiresIn
          language
          timeZone
          theme
        }
      }
    `;
    const response = await request(BASE_URL)
      .post("/")
      .send({ query: mutation });
    const originalError = response.body.errors[0].extensions.originalError;
    console.log(originalError);
    expect(response.status).toBe(200);
    expect(response.body.errors).toBeDefined();
  }, 1000);

  it("should fail to register a user with invalid password", async () => {
    const mutation = `
      mutation {
        defaultRegister(
          input: {
            userName: "testUserName123"
            displayName: "testDisplayName123"
            email: "testuser@example.com"
            password: "Test1234"
          }
        ) {
          accessToken
          expiresIn
          language
          timeZone
          theme
        }
      }
    `;
    const response = await request(BASE_URL)
      .post("/")
      .send({ query: mutation });
    const originalError = response.body.errors[0].extensions.originalError;
    console.log(originalError);
    expect(response.status).toBe(200);
    expect(response.body.errors).toBeDefined();
  }, 1000);

  it("should register a user successfully", async () => {
    const mutation = `
      mutation {
        defaultRegister(
          input: {
            userName: "testUserName123"
            displayName: "testDisplayName123"
            email: "testuser@example.com"
            password: "Test1234!"
          }
        ) {
          accessToken
          expiresIn
          language
          timeZone
          theme
        }
      }
    `;

    const response = await request(BASE_URL)
      .post("/")
      .send({ query: mutation });
    expect(response.status).toBe(200);
    const result = response.body.data.defaultRegister;
    expect(result.accessToken).toBeDefined();
  }, 10000);
});
