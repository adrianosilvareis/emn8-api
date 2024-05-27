import { Controller } from "@/protocols/controller";
import { HttpResponses } from "@/protocols/http-responses";
import { DeleteEmployeeRepository } from "../repositories/delete-employee.repository";

type ByIdParameter = {
  id: string;
};

export class DeleteEmployeeController implements Controller<ByIdParameter> {
  constructor(private repository: DeleteEmployeeRepository) {}

  async execute(request: ByIdParameter) {
    try {
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
