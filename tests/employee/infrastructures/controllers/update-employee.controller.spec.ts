import { UpdateEmployeeController } from "@/employees/infrastructure/controllers/update-employee.controller";
import { MockedEmployeeDatabase } from "@/employees/infrastructure/gateways/database/mocked-employee.database";
import { UpdateEmployeeRepository } from "@/employees/infrastructure/repositories/update-employee.repository";

const database = new MockedEmployeeDatabase();

describe("UpdateEmployeeController", () => {
  it("should return 200 when success", async () => {
    const repository = new UpdateEmployeeRepository(database);
    const sut = new UpdateEmployeeController(repository);

    const body = {
      id: "64c801b4-35bb-4739-b942-5db7c0cce5ab",
      firstName: "New Name"
    };

    const response = await sut.execute(body);
    expect(response.code).toBe(200);
    expect(response.message.firstName).toBe(body.firstName);
  });

  it("should return 500 with error message on throw", async () => {
    jest.spyOn(database, "updateEmployee").mockImplementationOnce(() => {
      throw new Error("Any error message");
    });
    const repository = new UpdateEmployeeRepository(database);
    const sut = new UpdateEmployeeController(repository);
    const body = {
      id: "64c801b4-35bb-4739-b942-5db7c0cce5ab",
      firstName: "New Name"
    };

    const response = await sut.execute(body);
    expect(response.code).toBe(500);
    expect(response.message).toBe("Any error message");
  });

  it("should return 404 with not found employee", async () => {
    const repository = new UpdateEmployeeRepository(database);
    const sut = new UpdateEmployeeController(repository);
    const body = {
      id: "123456",
      firstName: "not found"
    };

    const response = await sut.execute(body);
    expect(response.code).toBe(404);
    expect(response.message).toBe("Not Found");
  });
});
