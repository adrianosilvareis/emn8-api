import { GetAllDepartmentController } from "../infrastructure/controllers/get-all-departments.controller";
import { PostgresDepartmentDatabase } from "../infrastructure/gateways/database/postgres-department.database";
import { GetAllDepartmentRepository } from "../infrastructure/repositories/get-all-departments.repository";

const database = new PostgresDepartmentDatabase();
const departmentRepository = new GetAllDepartmentRepository(database);
export const departmentController = new GetAllDepartmentController(
  departmentRepository
);
