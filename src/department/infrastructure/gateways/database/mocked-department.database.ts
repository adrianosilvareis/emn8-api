import { DepartmentApplication } from "@/department/domain/applications/department.application";
import { DepartmentDatabase } from "@/department/domain/protocols/department.database";

export class MockedDepartmentDatabase implements DepartmentDatabase {
  departments: DepartmentApplication[] = [
    {
      id: "c12c4caf-1c2e-4e1c-a6a5-7e6c50fd6983",
      name: "Department 1"
    },
    {
      id: "c12c4caf-1c2e-4e1c-a6a5-7e6c50fd6983",
      name: "Department 2"
    }
  ];

  async getAll(): Promise<DepartmentApplication[]> {
    return Promise.resolve(this.departments);
  }
}
