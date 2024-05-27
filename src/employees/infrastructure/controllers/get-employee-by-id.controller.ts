import { Controller } from "@/protocols/controller";
import { HttpResponses } from "@/protocols/http-responses";
import { GetEmployeeByIdRepository } from "../repositories/get-employee-by-id.repository";

type ByIdParameters = { id: string };

export class GetEmployeeByIdController implements Controller<ByIdParameters> {
  constructor(private repository: GetEmployeeByIdRepository) {}

  async execute({ id }: ByIdParameters): Promise<HttpResponses> {
    try {
      const employee = await this.repository.getById(id);
      if (employee === null) {
        return HttpResponses.NotFound();
      }
      return HttpResponses.OK(employee);
    } catch (error: any) {
      return HttpResponses.InternalError(error.message);
    }
  }
}
