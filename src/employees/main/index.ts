import { routerAdapter } from "@/protocols/router-adapter";
import { Router } from "express";
import {
  createEmployeeController,
  deleteEmployeeController,
  getAllEmployeesController,
  getEmployeeByIdController,
  updateEmployeeController
} from "./employee.build";

export const employeeRouters = (app: Router) => {
  app.get("/employee/get-all", routerAdapter(getAllEmployeesController));
  app.get("/employee/:id", routerAdapter(getEmployeeByIdController));
  app.delete("/employee/:id", routerAdapter(deleteEmployeeController));
  app.put("/employee/:id", routerAdapter(updateEmployeeController));
  app.post("/employee/", routerAdapter(createEmployeeController));
  return app;
};
