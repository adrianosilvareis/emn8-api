import { Department } from "@/department/domain/entities/department";
import { DepartmentDatabase } from "@/department/domain/protocols/department.database";
import { GetAllDepartments } from "@/department/domain/use-cases/get-all-departments";

export class GetAllDepartmentRepository implements GetAllDepartments {
  constructor(private readonly database: DepartmentDatabase) {}

  async getAll(): Promise<Department[]> {
    return this.database.getAll();
  }
}
