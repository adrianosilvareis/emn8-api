import { MockedDepartmentDatabase } from "@/department/infrastructure/gateways/database/mocked-department.database";
import { GetAllDepartmentRepository } from "@/department/infrastructure/repositories/get-all-department.repository";

const database = new MockedDepartmentDatabase();

describe("Get All Departments Repository", () => {
  it("should return all departments", async () => {
    const sut = new GetAllDepartmentRepository(database);
    const list = await sut.getAll();
    expect(list).toEqual([
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

  it("should throw if database throws", async () => {
    const spyDatabase = {
      getAll: jest.fn(() => {
        throw new Error("Error");
      })
    };
    const sut = new GetAllDepartmentRepository(spyDatabase);

    expect(() => sut.getAll()).rejects.toThrow(new Error("Error"));
  });
});
