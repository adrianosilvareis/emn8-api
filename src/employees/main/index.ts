import { routerAdapter } from "@/protocols/router-adapter";
import { Router } from "express";
import {
  deleteEmployeeController,
  getAllEmployeesController,
  getEmployeeByIdController
} from "./employee.build";

export const employeeRouters = (app: Router) => {
  app.get("/employee/get-all", routerAdapter(getAllEmployeesController));
  app.get("/employee/:id", routerAdapter(getEmployeeByIdController));
  app.delete("/employee/:id", routerAdapter(deleteEmployeeController));
  return app;
};
