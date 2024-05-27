import { GetAllEmployeesController } from "@/employees/infrastructure/controllers/get-all-employees.controller";
import { MockedEmployeeDatabase } from "@/employees/infrastructure/gateways/database/mocked-employee.database";
import { GetAllEmployeesRepository } from "@/employees/infrastructure/repositories/get-all-employees.repository";

const database = new MockedEmployeeDatabase();

describe("GetAllEmployeesController", () => {
  it("should return 200 with all employees", async () => {
    const repository = new GetAllEmployeesRepository(database);
    const sut = new GetAllEmployeesController(repository);
    const response = await sut.execute();
    expect(response.code).toBe(200);
    expect(response.message).toHaveLength(database.employees.length);
  });

  it("should return 500 with error message on throw", async () => {
    jest.spyOn(database, "getAllEmployees").mockImplementation(() => {
      throw new Error("Any error message");
    });
    const repository = new GetAllEmployeesRepository(database);
    const sut = new GetAllEmployeesController(repository);
    const response = await sut.execute();
    expect(response.code).toBe(500);
    expect(response.message).toBe("Any error message");
  });
});
