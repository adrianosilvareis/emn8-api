import { Controller } from "@/protocols/controller";
import { HttpResponses } from "@/protocols/http-responses";
import { deleteEmployeeValidator } from "../presentation/request/delete-employe.validation";
import { DeleteEmployeeRepository } from "../repositories/delete-employee.repository";

type ByIdParameter = {
  id: string;
};

export class DeleteEmployeeController implements Controller<ByIdParameter> {
  constructor(private repository: DeleteEmployeeRepository) {}

  async execute(request: ByIdParameter) {
    try {
      const validatedRequest = deleteEmployeeValidator(request);

      if (!validatedRequest.success) {
        return HttpResponses.BadRequest(validatedRequest.error.errors);
      }

      const response = await this.repository.deleteById(request.id);

      if (!response) {
        return HttpResponses.NotFound();
      }

      return HttpResponses.OK(response);
    } catch (error: any) {
      return HttpResponses.InternalError(error.message);
    }
  }
}
