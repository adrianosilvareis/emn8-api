import { EmployeeApplication } from "../applications/employee.applications";

export abstract class GetAllEmployees {
  abstract getAll(): Promise<EmployeeApplication[]>;
}
