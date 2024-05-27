import { Department } from "../entities/department";

export abstract class GetAllDepartments {
  abstract getAll(): Promise<Department[]>;
}
