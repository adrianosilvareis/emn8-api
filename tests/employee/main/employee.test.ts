import { GetAllEmployeesController } from "@/employees/infrastructure/controllers/get-all-employees.controller";
import { MockedEmployeeDatabase } from "@/employees/infrastructure/gateways/database/mocked-employee.database";
import { GetAllEmployeesRepository } from "@/employees/infrastructure/repositories/get-all-employees.repository";
import { app } from "@/express.config";
import { routerAdapter } from "@/protocols/router-adapter";
import request from "supertest";

const database = new MockedEmployeeDatabase();
const repository = new GetAllEmployeesRepository(database);
const controller = new GetAllEmployeesController(repository);

describe("Employee integration tests", () => {
  it("should return all employee", async () => {
    app.get("/success", routerAdapter(controller));
    const response = await request(app).get("/success");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        firstName: "John",
        hireDate: "2021-01-01T00:00:00.000Z",
        id: "64c801b4-35bb-4739-b942-5db7c0cce5ab",
        lastName: "Doe",
        phone: "555-555-5555",
        address: "1234 Elm St",
        department: {
          id: "1ff629a9-d532-4914-9606-96efac1e8ce7",
          name: "IT"
        }
      }
    ]);
  });

  it("should return internal error when employee throw", async () => {
    jest.spyOn(database, "getAllEmployees").mockImplementation(() => {
      throw new Error();
    });

    app.get("/failure", routerAdapter(controller));
    const response = await request(app).get("/failure");
    expect(response.status).toBe(500);
  });
});
