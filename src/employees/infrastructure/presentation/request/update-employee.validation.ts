import { z } from "zod";

const validator = z.object({
  id: z.string().uuid(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  hireDate: z.string().datetime().optional(),
  departmentId: z.string().uuid().optional(),
  phone: z.string().optional(),
  address: z.string().optional()
});

export const updateEmployeeValidator = (request: any) => {
  return validator.safeParse(request);
};
