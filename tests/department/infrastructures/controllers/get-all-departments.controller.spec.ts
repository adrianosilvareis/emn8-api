import { GetAllDepartmentController } from "@/department/infrastructure/controllers/get-all-departments.controller";
import { MockedDepartmentDatabase } from "@/department/infrastructure/gateways/database/mocked-department.database";
import { GetAllDepartmentRepository } from "@/department/infrastructure/repositories/get-all-department.repository";

const database = new MockedDepartmentDatabase();

describe("GetAllDepartmentsController", () => {
  it("should return 200 with all departments", async () => {
    const departmentRepository = new GetAllDepartmentRepository(database);
    const sut = new GetAllDepartmentController(departmentRepository);
    const response = await sut.execute();
    expect(response.code).toBe(200);
    expect(response.message).toHaveLength(database.departments.length);
  });

  it("should return 500 with error message on throw", async () => {
    const spyDatabase = {
      getAll: jest.fn().mockImplementation(() => {
        throw new Error("Any error message");
      })
    };
    const departmentRepository = new GetAllDepartmentRepository(spyDatabase);
    const sut = new GetAllDepartmentController(departmentRepository);
    const response = await sut.execute();
    expect(response.code).toBe(500);
    expect(response.message).toBe("Any error message");
  });
});
