import { EmployeeApplication } from "@/employees/domain/applications/employee.applications";
import { Employee } from "@/employees/domain/entities/employee";
import { EmployeeDatabase } from "@/employees/domain/protocols/employee.database";
import { CreateEmployeeUseCase } from "@/employees/domain/use-cases/create-employee.use-case";

export class CreateEmployeeRepository implements CreateEmployeeUseCase {
  constructor(private employeeDatabase: EmployeeDatabase) {}
  async create(employee: Partial<Employee>): Promise<EmployeeApplication> {
    return this.employeeDatabase.createEmployee(employee);
  }
}
