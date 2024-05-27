import { EmployeeApplication } from "@/employees/domain/applications/employee.applications";
import { EmployeeDatabase } from "@/employees/domain/protocols/employee.database";
import { GetEmployeeByIdUseCase } from "@/employees/domain/use-cases/get-employee-by-id.use-case";

export class GetEmployeeByIdRepository implements GetEmployeeByIdUseCase {
  constructor(private employeeDatabase: EmployeeDatabase) {}
  async getById(id: string): Promise<EmployeeApplication | null> {
    return this.employeeDatabase.getEmployeeById(id);
  }
}
