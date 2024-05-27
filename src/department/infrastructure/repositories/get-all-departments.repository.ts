import { Department } from "@/department/domain/entities/department";
import { DepartmentDatabase } from "@/department/domain/protocols/department.database";
import { GetAllDepartmentsUseCase } from "@/department/domain/use-cases/get-all-departments.use-case";

export class GetAllDepartmentRepository implements GetAllDepartmentsUseCase {
  constructor(private readonly database: DepartmentDatabase) {}

  async getAll(): Promise<Department[]> {
    return this.database.getAll();
  }
}
