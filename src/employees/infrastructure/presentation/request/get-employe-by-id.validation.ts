import { z } from "zod";

const validator = z.object({
  id: z.string().uuid()
});

export const getEmployeeByIdValidator = (request: any) => {
  return validator.safeParse(request);
};
