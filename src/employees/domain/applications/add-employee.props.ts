export class AddEmployeeProps {
  constructor(
    public firstName: string,
    public lastName: string,
    public phone: string,
    public address: string,
    public departmentId: string,
    public hireDate: Date
  ) {}
}
