import { routerAdapter } from "@/protocols/router-adapter";
import { Router } from "express";
import {
  getAllEmployeesController,
  getEmployeeByIdController
} from "./employee.build";

export const employeeRouters = (app: Router) => {
  app.get("/employee/get-all", routerAdapter(getAllEmployeesController));
  app.get("/employee/:id", routerAdapter(getEmployeeByIdController));
  return app;
};
