import { EmployeeApplication } from "@/employees/domain/applications/employee.applications";
import { EmployeeDatabase } from "@/employees/domain/protocols/employee.database";
import { UpdateEmployeeUseCase } from "@/employees/domain/use-cases/update-employee.use-case";

export class UpdateEmployeeRepository implements UpdateEmployeeUseCase {
  constructor(private employeeDatabase: EmployeeDatabase) {}

  async update(
    id: string,
    updates: Partial<EmployeeApplication>
  ): Promise<EmployeeApplication | null> {
    const updated = await this.employeeDatabase.updateEmployee(id, updates);
    return updated;
  }
}
