import { DeleteEmployeeController } from "@/employees/infrastructure/controllers/delete-employee.controller";
import { GetAllEmployeesController } from "@/employees/infrastructure/controllers/get-all-employees.controller";
import { GetEmployeeByIdController } from "@/employees/infrastructure/controllers/get-employee-by-id.controller";
import { MockedEmployeeDatabase } from "@/employees/infrastructure/gateways/database/mocked-employee.database";
import { DeleteEmployeeRepository } from "@/employees/infrastructure/repositories/delete-employee.repository";
import { GetAllEmployeesRepository } from "@/employees/infrastructure/repositories/get-all-employees.repository";
import { GetEmployeeByIdRepository } from "@/employees/infrastructure/repositories/get-employee-by-id.repository";
import { app } from "@/express.config";
import { routerAdapter } from "@/protocols/router-adapter";
import request from "supertest";

const database = new MockedEmployeeDatabase();
const getAllEmployeeRepository = new GetAllEmployeesRepository(database);
const getAllEmployeeController = new GetAllEmployeesController(
  getAllEmployeeRepository
);

const getEmployeeByIdRepository = new GetEmployeeByIdRepository(database);
const getEmployeeByIdController = new GetEmployeeByIdController(
  getEmployeeByIdRepository
);

const deleteEmployeeRepository = new DeleteEmployeeRepository(database);
const deleteEmployeeController = new DeleteEmployeeController(
  deleteEmployeeRepository
);

describe("Employee integration tests", () => {
  describe("GET /employee/get-all", () => {
    it("should return all employee", async () => {
      app.get("/list/success", routerAdapter(getAllEmployeeController));
      const response = await request(app).get("/list/success");
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
      jest.spyOn(database, "getAllEmployees").mockImplementationOnce(() => {
        throw new Error();
      });

      app.get("/list/failure", routerAdapter(getAllEmployeeController));
      const response = await request(app).get("/list/failure");
      expect(response.status).toBe(500);
    });
  });

  describe("GET /employee/:id", () => {
    it("should return employee by id", async () => {
      app.get("/findOne/success/:id", routerAdapter(getEmployeeByIdController));
      const response = await request(app).get(
        "/findOne/success/64c801b4-35bb-4739-b942-5db7c0cce5ab"
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
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
      });
    });

    it("should return internal error when employee database throw", async () => {
      jest.spyOn(database, "getEmployeeById").mockImplementationOnce(() => {
        throw new Error();
      });

      app.get("/findOne/failure", routerAdapter(getEmployeeByIdController));
      const response = await request(app).get("/findOne/failure");
      expect(response.status).toBe(500);
    });

    it("should return not found error when employee not found", async () => {
      app.get("/failure/:id", routerAdapter(getEmployeeByIdController));
      const response = await request(app).get("/findOne/failure/123");
      expect(response.status).toBe(404);
    });
  });

  describe("DELETE /employee/:id", () => {
    it("should return 200 when employee is deleted", async () => {
      app.delete(
        "/delete/success/:id",
        routerAdapter(deleteEmployeeController)
      );
      const response = await request(app).delete(
        "/delete/success/64c801b4-35bb-4739-b942-5db7c0cce5ab"
      );
      expect(response.status).toBe(200);
      expect(response.body).toBeTruthy();
    });

    it("should return internal error when employee database throw", async () => {
      jest.spyOn(database, "deleteEmployee").mockImplementationOnce(() => {
        throw new Error();
      });

      app.delete(
        "/delete/failure/:id",
        routerAdapter(deleteEmployeeController)
      );
      const response = await request(app).delete("/delete/failure/123");
      expect(response.status).toBe(500);
    });

    it("should return not found error when employee not found", async () => {
      app.delete(
        "/delete/failure/:id",
        routerAdapter(deleteEmployeeController)
      );
      const response = await request(app).delete("/delete/failure/123");
      expect(response.status).toBe(404);
    });
  });
});
