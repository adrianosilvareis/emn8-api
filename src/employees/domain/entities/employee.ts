import { Department } from "@/department/domain/entities/department";
import { EmployeeHistory } from "./employee-history";

export class Employee {
  constructor(
    public firstName: string,
    public lastName: string,
    public hireDate: Date,
    public department: Department,
    public active: boolean,
    public employeeHistory: EmployeeHistory[],
    public phone?: string,
    public address?: string
  ) {}
}
