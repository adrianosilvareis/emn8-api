import { z } from "zod";

const validator = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  address: z.string(),
  departmentId: z.string().uuid(),
  hireDate: z.string().date()
});

export const createEmployeeValidator = (request: any) => {
  return validator.safeParse(request);
};
