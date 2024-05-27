import { routerAdapter } from "@/protocols/router-adapter";
import { Router } from "express";
import { departmentController } from "./department.build";

export const departmentRouters = (app: Router) => {
  app.get("/department/get-all", routerAdapter(departmentController));
  return app;
};
