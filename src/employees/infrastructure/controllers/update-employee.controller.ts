import { EmployeeApplication } from "@/employees/domain/applications/employee.applications";
import { Controller } from "@/protocols/controller";
import { HttpResponses } from "@/protocols/http-responses";
import { updateEmployeeValidator } from "../presentation/request/update-employee.validation";
import { UpdateEmployeeRepository } from "../repositories/update-employee.repository";

type EmployeeUpdateParameters = Partial<
  Omit<EmployeeApplication, "department">
> & { id: string; departmentId?: string };

export class UpdateEmployeeController
  implements Controller<EmployeeUpdateParameters>
{
  constructor(private readonly repository: UpdateEmployeeRepository) {}

  async execute(body: EmployeeUpdateParameters): Promise<HttpResponses> {
    try {
      const validatedRequest = updateEmployeeValidator(body);

      if (!validatedRequest.success) {
        return HttpResponses.BadRequest(validatedRequest.error.errors);
      }

      const updated = await this.repository.update(body.id, body);

      if (updated === null) return HttpResponses.NotFound();

      return HttpResponses.OK(updated);
    } catch (error: any) {
      return HttpResponses.InternalError(error.message);
    }
  }
}
