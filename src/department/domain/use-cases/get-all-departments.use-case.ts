import { Department } from "../entities/department";

export abstract class GetAllDepartmentsUseCase {
  abstract getAll(): Promise<Department[]>;
}
