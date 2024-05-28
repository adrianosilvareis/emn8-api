import { MockedEmployeeDatabase } from "@/employees/infrastructure/gateways/database/mocked-employee.database";
import { GetEmployeeByIdRepository } from "@/employees/infrastructure/repositories/get-employee-by-id.repository";

const database = new MockedEmployeeDatabase();

describe("Get Employee By Id Repository", () => {
  it("should return employee by id", async () => {
    const sut = new GetEmployeeByIdRepository(database);
    const list = await sut.getById("64c801b4-35bb-4739-b942-5db7c0cce5ab");
    expect(list).toEqual({
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
    });
  });

  it("should return null when not found", async () => {
    const sut = new GetEmployeeByIdRepository(database);
    const employee = await sut.getById("123");

    expect(employee).toBeNull();
  });

  it("should throw if database throws", async () => {
    jest.spyOn(database, "getEmployeeById").mockImplementationOnce(() => {
      throw new Error("Error");
    });

    const sut = new GetEmployeeByIdRepository(database);

    expect(() => sut.getById("123")).rejects.toThrow(new Error("Error"));
  });
});
