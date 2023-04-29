const request = require("supertest");
const app = require("../server");
const Client = require("../src/services/v1/models/clientModel");

// // Set up the test environment
// beforeAll(async () => {
//   await db.sequelize.sync({ force: true });
// });

// // Clean up the test environment after each test
// afterEach(async () => {
//   await Client.destroy({ where: {} });
// });

// // Close the database connection after all tests are done
// afterAll(async () => {
//   await db.sequelize.close();
// });

describe("Client Model Controller", () => {
  // Write unit tests and integration tests together
  describe("Unit and Integration Tests", () => {
    it("should create a new client", async () => {
      // Write a unit test for the create function
      const res = await request(app).post("/clients").send({
        first_name: "John",
        father_name: "Doe",
        phone_no: "1234567890",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body.first_name).toEqual("John");
      expect(res.body.father_name).toEqual("Doe");
      expect(res.body.phone_no).toEqual("1234567890");

      // Write an integration test for the findAll function
      await Client.create({
        first_name: "Jane",
        father_name: "Doe",
        phone_no: "0987654321",
      });
      const res2 = await request(app).get("/clients");
      expect(res2.statusCode).toEqual(200);
      expect(res2.body.length).toEqual(1);
      expect(res2.body[0].first_name).toEqual("Jane");
    });
  });
});
