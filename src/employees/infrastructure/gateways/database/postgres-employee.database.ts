import { DepartmentApplication } from "@/department/domain/applications/department.application";
import { EmployeeApplication } from "@/employees/domain/applications/employee.applications";
import { EmployeeDatabase } from "@/employees/domain/protocols/employee.database";
import { Department, Employee, PrismaClient } from "@prisma/client";

type ToMapper = Employee & { department: Department };

const mapper = (employee: ToMapper): EmployeeApplication =>
  new EmployeeApplication(
    employee.firstName,
    employee.lastName,
    employee.hireDate,
    new DepartmentApplication(employee.department.name, employee.department.id),
    employee.phone || undefined,
    employee.address || undefined,
    employee.id
  );

export class PostgresEmployeeDatabase implements EmployeeDatabase {
  connect = new PrismaClient();

  async createEmployee(
    employee: Omit<EmployeeApplication, "id">
  ): Promise<EmployeeApplication> {
    const employeeApp = new EmployeeApplication(
      employee.firstName,
      employee.lastName,
      employee.hireDate,
      employee.department,
      employee.phone,
      employee.address
    );

    await this.connect.employee.create({
      data: {
        id: employeeApp.id,
        firstName: employeeApp.firstName,
        lastName: employeeApp.lastName,
        hireDate: employeeApp.hireDate,
        phone: employeeApp.phone,
        address: employeeApp.address,
        departmentId: employeeApp.department.id
      }
    });

    return employeeApp;
  }

  async getEmployeeById(id: string): Promise<EmployeeApplication | null> {
    const found = await this.connect.employee.findUnique({
      where: {
        id
      },
      include: {
        department: true
      }
    });

    if (!found) return null;

    return mapper(found);
  }

  async getAllEmployees(): Promise<EmployeeApplication[]> {
    const employees = await this.connect.employee.findMany({
      include: {
        department: true
      }
    });

    return employees.map(mapper);
  }

  async updateEmployee(
    id: string,
    updates: Partial<EmployeeApplication>
  ): Promise<EmployeeApplication | null> {
    const updated = await this.connect.employee.update({
      where: {
        id
      },
      data: {
        firstName: updates.firstName,
        lastName: updates.lastName,
        address: updates.address,
        phone: updates.phone,
        departmentId: updates.department?.id,
        hireDate: updates.hireDate
      },
      include: {
        department: true
      }
    });

    return mapper(updated);
  }

  async deleteEmployee(id: string): Promise<boolean> {
    const deleted = await this.connect.employee.delete({
      where: {
        id
      }
    });
    return !!deleted;
  }
}
