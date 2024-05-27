import { GetAllDepartmentController } from "@/department/infrastructure/controllers/get-all-departments.controller";
import { MockedDepartmentDatabase } from "@/department/infrastructure/gateways/database/mocked-department.database";
import { GetAllDepartmentRepository } from "@/department/infrastructure/repositories/get-all-departments.repository";
import { app } from "@/express.config";
import { routerAdapter } from "@/protocols/router-adapter";
import request from "supertest";

const database = new MockedDepartmentDatabase();
const departmentRepository = new GetAllDepartmentRepository(database);
const departmentController = new GetAllDepartmentController(
  departmentRepository
);

describe("Department integration tests", () => {
  it("should return all departments", async () => {
    app.get("/success", routerAdapter(departmentController));
    const response = await request(app).get("/success");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: "c12c4caf-1c2e-4e1c-a6a5-7e6c50fd6983",
        name: "Department 1"
      },
      {
        id: "c12c4caf-1c2e-4e1c-a6a5-7e6c50fd6983",
        name: "Department 2"
      }
    ]);
  });

  it("should return internal error when department throw", async () => {
    jest.spyOn(database, "getAll").mockImplementation(() => {
      throw new Error();
    });

    app.get("/failure", routerAdapter(departmentController));
    const response = await request(app).get("/failure");
    expect(response.status).toBe(500);
  });
});
