import { MockedEmployeeDatabase } from "@/employees/infrastructure/gateways/database/mocked-employee.database";
import { DeleteEmployeeRepository } from "@/employees/infrastructure/repositories/delete-employee.repository";
import { GetEmployeeByIdRepository } from "@/employees/infrastructure/repositories/get-employee-by-id.repository";

const database = new MockedEmployeeDatabase();

describe("Delete Employee Repository", () => {
  it("should return true if employee is deleted", async () => {
    const sut = new DeleteEmployeeRepository(database);
    const confirm = await sut.deleteById(
      "64c801b4-35bb-4739-b942-5db7c0cce5ab"
    );
    expect(confirm).toBeTruthy();
  });

  it("should return false when employee not found", async () => {
    const sut = new DeleteEmployeeRepository(database);
    const employee = await sut.deleteById("123");

    expect(employee).toBeFalsy();
  });

  it("should throw if database throws", async () => {
    jest.spyOn(database, "getEmployeeById").mockImplementationOnce(() => {
      throw new Error("Error");
    });

    const sut = new GetEmployeeByIdRepository(database);

    expect(() => sut.getById("123")).rejects.toThrow(new Error("Error"));
  });
});
