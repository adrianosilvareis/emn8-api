import { DepartmentApplication } from "../applications/department.application";

export abstract class DepartmentDatabase {
  abstract getAll(): Promise<DepartmentApplication[]>;
}
