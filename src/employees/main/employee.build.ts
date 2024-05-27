import { GetEmployeeByIdController } from "../infrastructure/controllers/get-employee-by-id.controller";
import { PostgresEmployeeDatabase } from "../infrastructure/gateways/database/postgres-employee.database";
import { GetAllEmployeesRepository } from "../infrastructure/repositories/get-all-employees.repository";
import { GetEmployeeByIdRepository } from "../infrastructure/repositories/get-employee-by-id.repository";
import { GetAllEmployeesController } from "./../infrastructure/controllers/get-all-employees.controller";

const database = new PostgresEmployeeDatabase();

const getAllEmployeesRepository = new GetAllEmployeesRepository(database);
export const getAllEmployeesController = new GetAllEmployeesController(
  getAllEmployeesRepository
);

const getEmployeeById = new GetEmployeeByIdRepository(database);
export const getEmployeeByIdController = new GetEmployeeByIdController(
  getEmployeeById
);
