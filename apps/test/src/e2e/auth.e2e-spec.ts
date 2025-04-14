import request from "supertest";

const BASE_URL =
  process.env.BACKEND_DEVELOPMENT_URL || "http://localhost:3333/graphql";

describe("Auth API (e2e)", () => {
  it("should register a user successfully", async () => {
    const mutation = `
      mutation {
        defaultRegister(
          input: {
            userName: "testUser"
            displayName: "Test User"
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

  it("should fail to register a user with invalid input", async () => {
    const mutation = `
      mutation {
        defaultRegister(
          input: {
            userName: "invalid@user"
            displayName: "Test User"
            email: "invalid-email"
            password: "123"
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
  });
});
