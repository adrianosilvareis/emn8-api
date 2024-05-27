import { Request, Response } from "express";
import { Controller } from "./controller";

export function routerAdapter(controller: Controller) {
  return async (req: Request, res: Response) => {
    const body = Object.assign({}, req.body, req.query, req.params);
    const response = await controller.execute(body);
    return res.status(response.code).json(response.message);
  };
}
