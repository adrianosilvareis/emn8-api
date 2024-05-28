import { MockedEmployeeDatabase } from "@/employees/infrastructure/gateways/database/mocked-employee.database";
import { UpdateEmployeeRepository } from "@/employees/infrastructure/repositories/update-employee.repository";

const database = new MockedEmployeeDatabase();

describe("Update Employee Repository", () => {
  it("should return updated employee on success", async () => {
    const sut = new UpdateEmployeeRepository(database);

    const updated = await sut.update("64c801b4-35bb-4739-b942-5db7c0cce5ab", {
      firstName: "Jonny"
    });

    expect(updated).toEqual({
      address: "1234 Elm St",
      department: {
        id: "1ff629a9-d532-4914-9606-96efac1e8ce7",
        name: "IT"
      },
      firstName: "Jonny",
      hireDate: new Date("2021-01-01T00:00:00.000Z"),
      id: "64c801b4-35bb-4739-b942-5db7c0cce5ab",
      lastName: "Doe",
      phone: "555-555-5555",
      employeeHistory: [],
      active: true
    });
  });

  it("should throw if database throws", async () => {
    jest.spyOn(database, "updateEmployee").mockImplementation(() => {
      throw new Error("Error");
    });

    const sut = new UpdateEmployeeRepository(database);

    expect(() =>
      sut.update("123456", { firstName: "anyName" })
    ).rejects.toThrow(new Error("Error"));
  });
});
