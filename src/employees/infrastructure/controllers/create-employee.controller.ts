import { AddEmployeeProps } from "@/employees/domain/applications/add-employee.props";
import { Controller } from "@/protocols/controller";
import { HttpResponses } from "@/protocols/http-responses";
import { createEmployeeValidator } from "../presentation/request/create-employee.validation";
import { CreateEmployeeRepository } from "../repositories/create-employee.repository";

export class CreateEmployeeController implements Controller<AddEmployeeProps> {
  constructor(private repository: CreateEmployeeRepository) {}

  async execute(request: AddEmployeeProps) {
    try {
      const validatedRequest = createEmployeeValidator(request);

      if (!validatedRequest.success) {
        return HttpResponses.BadRequest(validatedRequest.error.errors);
      }

      const response = await this.repository.create(request);

      return HttpResponses.OK(response);
    } catch (error: any) {
      return HttpResponses.InternalError(error.message);
    }
  }
}
