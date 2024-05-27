import { EmployeeApplication } from "../applications/employee.applications";

export abstract class GetEmployeeByIdUseCase {
  abstract getById(id: string): Promise<EmployeeApplication | null>;
}
