import { Request, Response } from "express";
import { Controller } from "./controller";

export function routerAdapter(controller: Controller) {
  return async (req: Request, res: Response) => {
    const response = await controller.execute();
    return res.status(response.code).json(response.message);
  };
}
