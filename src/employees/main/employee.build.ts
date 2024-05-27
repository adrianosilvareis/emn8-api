import { PostgresEmployeeDatabase } from "../infrastructure/gateways/database/postgres-employee.database";
import { GetAllEmployeesRepository } from "../infrastructure/repositories/get-all-employees.repository";
import { GetAllEmployeesController } from "./../infrastructure/controllers/get-all-employees.controller";

const database = new PostgresEmployeeDatabase();
const repository = new GetAllEmployeesRepository(database);

export const getAllEmployeesController = new GetAllEmployeesController(
  repository
);
