import { GetEmployeeByIdController } from "@/employees/infrastructure/controllers/get-employee-by-id.controller";
import { MockedEmployeeDatabase } from "@/employees/infrastructure/gateways/database/mocked-employee.database";
import { GetEmployeeByIdRepository } from "@/employees/infrastructure/repositories/get-employee-by-id.repository";

const database = new MockedEmployeeDatabase();

describe("GetEmployeeByIdController", () => {
  it("should return 200 with found employee", async () => {
    const repository = new GetEmployeeByIdRepository(database);
    const sut = new GetEmployeeByIdController(repository);
    const response = await sut.execute({
      id: "64c801b4-35bb-4739-b942-5db7c0cce5ab"
    });
    expect(response.code).toBe(200);
    expect(response.message).toEqual({
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

  it("should return 500 with error message on throw", async () => {
    jest.spyOn(database, "getEmployeeById").mockImplementationOnce(() => {
      throw new Error("Any error message");
    });
    const repository = new GetEmployeeByIdRepository(database);
    const sut = new GetEmployeeByIdController(repository);
    const response = await sut.execute({
      id: "64c801b4-35bb-4739-b942-5db7c0cce5ab"
    });
    expect(response.code).toBe(500);
    expect(response.message).toBe("Any error message");
  });

  it("should return 404 when employee not found", async () => {
    const repository = new GetEmployeeByIdRepository(database);
    const sut = new GetEmployeeByIdController(repository);
    const response = await sut.execute({
      id: "64c801b4-35bb-4739-b942-5db7c0cce123"
    });
    expect(response.code).toBe(404);
    expect(response.message).toBe("Not Found");
  });

  it("should return 400 when employeeId is malformatted", async () => {
    const repository = new GetEmployeeByIdRepository(database);
    const sut = new GetEmployeeByIdController(repository);
    const response = await sut.execute({
      id: "1234"
    });
    expect(response.code).toBe(400);
    expect(response.message).toEqual([
      {
        code: "invalid_string",
        message: "Invalid uuid",
        path: ["id"],
        validation: "uuid"
      }
    ]);
  });
});
