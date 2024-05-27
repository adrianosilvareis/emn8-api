import { DeleteEmployeeController } from "@/employees/infrastructure/controllers/delete-employee.controller";
import { MockedEmployeeDatabase } from "@/employees/infrastructure/gateways/database/mocked-employee.database";
import { DeleteEmployeeRepository } from "@/employees/infrastructure/repositories/delete-employee.repository";

const database = new MockedEmployeeDatabase();

describe("DeleteEmployeeController", () => {
  it("should return 200 when employee is deleted", async () => {
    const repository = new DeleteEmployeeRepository(database);
    const sut = new DeleteEmployeeController(repository);
    const response = await sut.execute({
      id: "64c801b4-35bb-4739-b942-5db7c0cce5ab"
    });
    expect(response.code).toBe(200);
    expect(response.message).toBeTruthy();
  });

  it("should return 500 with error message on throw", async () => {
    jest.spyOn(database, "deleteEmployee").mockImplementationOnce(() => {
      throw new Error("Any error message");
    });
    const repository = new DeleteEmployeeRepository(database);
    const sut = new DeleteEmployeeController(repository);
    const response = await sut.execute({
      id: "64c801b4-35bb-4739-b942-5db7c0cce5ab"
    });
    expect(response.code).toBe(500);
    expect(response.message).toBe("Any error message");
  });

  it("should return 404 when employee not found", async () => {
    const repository = new DeleteEmployeeRepository(database);
    const sut = new DeleteEmployeeController(repository);
    const response = await sut.execute({
      id: "64c801b4-35bb-4739-b942-5db7c0cce123"
    });
    expect(response.code).toBe(404);
    expect(response.message).toBe("Not Found");
  });

  it("should return 400 when id is malformatted", async () => {
    const repository = new DeleteEmployeeRepository(database);
    const sut = new DeleteEmployeeController(repository);
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
