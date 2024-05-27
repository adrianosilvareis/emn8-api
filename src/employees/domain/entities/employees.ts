import { Department } from "@/department/domain/entities/department";

export class Employees {
  constructor(
    public firstName: string,
    public lastName: string,
    public hireDate: Date,
    public department: Department,
    public phone?: string,
    public address?: string
  ) {}
}
