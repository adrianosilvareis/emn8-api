import { Controller } from "@/protocols/controller";
import { HttpResponses } from "@/protocols/http-responses";
import { GetAllEmployeesRepository } from "../repositories/get-all-employees.repository";

export class GetAllEmployeesController implements Controller<unknown> {
  constructor(private repository: GetAllEmployeesRepository) {}

  async execute(): Promise<HttpResponses> {
    try {
      const employees = await this.repository.getAll();
      return HttpResponses.OK(employees);
    } catch (error: any) {
      return HttpResponses.InternalError(error.message);
    }
  }
}
