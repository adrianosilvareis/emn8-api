import { Controller } from "@/protocols/controller";
import { HttpResponses } from "@/protocols/http-responses";
import { getEmployeeByIdValidator } from "../presentation/request/get-employee-by-id.validation";
import { GetEmployeeByIdRepository } from "../repositories/get-employee-by-id.repository";

type ByIdParameters = { id: string };

export class GetEmployeeByIdController implements Controller<ByIdParameters> {
  constructor(private repository: GetEmployeeByIdRepository) {}

  async execute(request: ByIdParameters): Promise<HttpResponses> {
    try {
      const validatedRequest = getEmployeeByIdValidator(request);

      if (!validatedRequest.success) {
        return HttpResponses.BadRequest(validatedRequest.error.errors);
      }

      const employee = await this.repository.getById(request.id);
      if (employee === null) {
        return HttpResponses.NotFound();
      }
      return HttpResponses.OK(employee);
    } catch (error: any) {
      return HttpResponses.InternalError(error.message);
    }
  }
}
