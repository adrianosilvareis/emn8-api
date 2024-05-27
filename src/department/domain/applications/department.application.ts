import { randomUUID } from "crypto";
import { Department } from "../entities/department";

export class DepartmentApplication extends Department {
  public id: string;

  constructor(public name: string, id?: string) {
    super(name);
    this.id = id ?? randomUUID();
  }
}
