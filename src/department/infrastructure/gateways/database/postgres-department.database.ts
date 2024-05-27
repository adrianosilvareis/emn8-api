import { DepartmentApplication } from "@/department/domain/applications/department.application";
import { DepartmentDatabase } from "@/department/domain/protocols/department.database";
import { PrismaClient } from "@prisma/client";

export class PostgresDepartmentDatabase implements DepartmentDatabase {
  connect = new PrismaClient();

  async getAll(): Promise<DepartmentApplication[]> {
    const departments = await this.connect.department.findMany();
    return departments.map(
      (department) => new DepartmentApplication(department.name, department.id)
    );
  }
}
