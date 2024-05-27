import { DepartmentApplication } from "@/department/domain/applications/department.application";
import { randomUUID } from "crypto";
import { Employee } from "../entities/employee";

export class EmployeeApplication extends Employee {
  public id: string;

  constructor(
    public firstName: string,
    public lastName: string,
    public hireDate: Date,
    public department: DepartmentApplication,
    public phone?: string,
    public address?: string,
    id?: string
  ) {
    super(firstName, lastName, hireDate, department, phone, address);
    this.id = id ?? randomUUID();
  }
}
