import { routerAdapter } from "@/protocols/router-adapter";
import { Router } from "express";
import { getAllEmployeesController } from "./employee.build";

export const employeeRouters = (app: Router) => {
  app.get("/employee/get-all", routerAdapter(getAllEmployeesController));
  return app;
};
