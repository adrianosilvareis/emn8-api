import { EmployeeApplication } from "@/employees/domain/applications/employee.applications";
import { EmployeeDatabase } from "@/employees/domain/protocols/employee.database";
import { GetAllEmployeesUseCase } from "@/employees/domain/use-cases/get-all-employees.use-case";

export class GetAllEmployeesRepository implements GetAllEmployeesUseCase {
  constructor(private employeeDatabase: EmployeeDatabase) {}

  async getAll(): Promise<EmployeeApplication[]> {
    return this.employeeDatabase.getAllEmployees();
  }
}
