import { DeleteEmployeeController } from "../infrastructure/controllers/delete-employee.controller";
import { GetEmployeeByIdController } from "../infrastructure/controllers/get-employee-by-id.controller";
import { UpdateEmployeeController } from "../infrastructure/controllers/update-employee.controller";
import { PostgresEmployeeDatabase } from "../infrastructure/gateways/database/postgres-employee.database";
import { DeleteEmployeeRepository } from "../infrastructure/repositories/delete-employee.repository";
import { GetAllEmployeesRepository } from "../infrastructure/repositories/get-all-employees.repository";
import { GetEmployeeByIdRepository } from "../infrastructure/repositories/get-employee-by-id.repository";
import { UpdateEmployeeRepository } from "../infrastructure/repositories/update-employee.repository";
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

const deleteEmployeeById = new DeleteEmployeeRepository(database);
export const deleteEmployeeController = new DeleteEmployeeController(
  deleteEmployeeById
);

const updateEmployee = new UpdateEmployeeRepository(database);
export const updateEmployeeController = new UpdateEmployeeController(
  updateEmployee
);
