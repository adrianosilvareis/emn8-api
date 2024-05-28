import { DepartmentApplication } from "@/department/domain/applications/department.application";
import { EmployeeApplication } from "@/employees/domain/applications/employee.applications";
import { EmployeeHistory } from "@/employees/domain/entities/employee-history";
import { EmployeeDatabase } from "@/employees/domain/protocols/employee.database";
import {
  Department,
  Employee,
  EmployeeHistory as History,
  PrismaClient
} from "@prisma/client";

type ToMapper = Employee & {
  department: Department;
  employeeHistory?: History[];
};

const mapper = (employee: ToMapper): EmployeeApplication =>
  new EmployeeApplication(
    employee.firstName,
    employee.lastName,
    employee.hireDate,
    new DepartmentApplication(employee.department.name, employee.department.id),
    employee.active,
    employee.employeeHistory?.map(
      (history) =>
        new EmployeeHistory(
          history.startDate,
          history.departmentId,
          history.endDate
        )
    ) ?? [],
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
      employee.active,
      employee.employeeHistory,
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
        departmentId: employeeApp.department.id,
        active: employeeApp.active
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
        department: true,
        employeeHistory: true
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
    if (updates.department) {
      await this.connect.employeeHistory.create({
        data: {
          employeeId: id,
          departmentId: updates.department.id,
          startDate: new Date()
        }
      });
    }

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
        hireDate: updates.hireDate,
        active: updates.active
      },
      include: {
        department: true,
        employeeHistory: true
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
