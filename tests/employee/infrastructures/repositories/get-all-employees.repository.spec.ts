import { MockedEmployeeDatabase } from "@/employees/infrastructure/gateways/database/mocked-employee.database";
import { GetAllEmployeesRepository } from "@/employees/infrastructure/repositories/get-all-employees.repository";

const database = new MockedEmployeeDatabase();

describe("Get All Employees Repository", () => {
  it("should return all employees", async () => {
    const sut = new GetAllEmployeesRepository(database);
    const list = await sut.getAll();
    expect(list).toEqual([
      {
        address: "1234 Elm St",
        department: {
          id: "1ff629a9-d532-4914-9606-96efac1e8ce7",
          name: "IT"
        },
        firstName: "John",
        hireDate: new Date("2021-01-01T00:00:00.000Z"),
        id: "64c801b4-35bb-4739-b942-5db7c0cce5ab",
        lastName: "Doe",
        phone: "555-555-5555",
        employeeHistory: [],
        active: true
      }
    ]);
  });

  it("should throw if database throws", async () => {
    jest.spyOn(database, "getAllEmployees").mockImplementation(() => {
      throw new Error("Error");
    });

    const sut = new GetAllEmployeesRepository(database);

    expect(() => sut.getAll()).rejects.toThrow(new Error("Error"));
  });
});
