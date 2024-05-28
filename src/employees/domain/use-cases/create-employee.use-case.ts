import { AddEmployeeProps } from "../applications/add-employee.props";
import { EmployeeApplication } from "../applications/employee.applications";
export abstract class CreateEmployeeUseCase {
  abstract create(employee: AddEmployeeProps): Promise<EmployeeApplication>;
}
