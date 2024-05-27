import { EmployeeDatabase } from "@/employees/domain/protocols/employee.database";
import { DeleteEmployeeUseCase } from "@/employees/domain/use-cases/delete-employee.use-case";

export class DeleteEmployeeRepository implements DeleteEmployeeUseCase {
  constructor(private employeeDatabase: EmployeeDatabase) {}
  async deleteById(id: string): Promise<boolean> {
    return this.employeeDatabase.deleteEmployee(id);
  }
}
