import { DepartmentApplication } from "@/department/domain/applications/department.application";
import { EmployeeApplication } from "@/employees/domain/applications/employee.applications";
import { EmployeeDatabase } from "@/employees/domain/protocols/employee.database";

export class MockedEmployeeDatabase implements EmployeeDatabase {
  employees: EmployeeApplication[] = [
    {
      id: "64c801b4-35bb-4739-b942-5db7c0cce5ab",
      firstName: "John",
      lastName: "Doe",
      hireDate: new Date("2021-01-01"),
      department: new DepartmentApplication(
        "IT",
        "1ff629a9-d532-4914-9606-96efac1e8ce7"
      ),
      address: "1234 Elm St",
      phone: "555-555-5555"
    }
  ];

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

    this.employees.push(employeeApp);

    return employeeApp;
  }

  async getEmployeeById(id: string): Promise<EmployeeApplication | null> {
    const found = this.employees.find((employee) => employee.id === id);

    if (found) {
      return Promise.resolve(found);
    }

    return Promise.resolve(null);
  }

  async getAllEmployees(): Promise<EmployeeApplication[]> {
    return Promise.resolve(this.employees);
  }

  async updateEmployee(
    id: string,
    updates: Partial<EmployeeApplication>
  ): Promise<EmployeeApplication | null> {
    this.employees = this.employees.map((employee) => {
      if (employee.id === id) {
        return { ...employee, ...updates };
      }
      return employee;
    });

    return this.getEmployeeById(id);
  }

  async deleteEmployee(id: string): Promise<boolean> {
    const found = await this.getEmployeeById(id);
    this.employees = this.employees.filter((employee) => employee.id !== id);
    return Promise.resolve(!!found);
  }
}
