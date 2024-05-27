import { EmployeeApplication } from "../applications/employee.applications";

export abstract class GetAllEmployeesUseCase {
  abstract getAll(): Promise<EmployeeApplication[]>;
}
