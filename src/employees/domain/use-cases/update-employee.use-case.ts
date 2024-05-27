import { EmployeeApplication } from "../applications/employee.applications";

export abstract class UpdateEmployeeUseCase {
  abstract update(
    id: string,
    updates: Partial<EmployeeApplication>
  ): Promise<EmployeeApplication | null>;
}
