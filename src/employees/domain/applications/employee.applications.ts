import { DepartmentApplication } from "@/department/domain/applications/department.application";
import { randomUUID } from "crypto";
import { Employee } from "../entities/employee";
import { EmployeeHistory } from "../entities/employee-history";

export class EmployeeApplication extends Employee {
  public id: string;

  constructor(
    public firstName: string,
    public lastName: string,
    public hireDate: Date,
    public department: DepartmentApplication,
    public active: boolean,
    public employeeHistory: EmployeeHistory[],
    public phone?: string,
    public address?: string,
    id?: string
  ) {
    super(
      firstName,
      lastName,
      hireDate,
      department,
      active,
      employeeHistory,
      phone,
      address
    );
    this.id = id ?? randomUUID();
  }
}
