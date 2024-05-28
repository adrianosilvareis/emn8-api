import { EmployeeApplication } from "../applications/employee.applications";
import { Employee } from "../entities/employee";

export abstract class EmployeeDatabase {
  abstract createEmployee(
    employee: Partial<Employee>
  ): Promise<EmployeeApplication>;
  abstract getEmployeeById(id: string): Promise<EmployeeApplication | null>;
  abstract getAllEmployees(): Promise<EmployeeApplication[]>;
  abstract updateEmployee(
    id: string,
    updates: Partial<EmployeeApplication>
  ): Promise<EmployeeApplication | null>;
  abstract deleteEmployee(id: string): Promise<boolean>;
}
