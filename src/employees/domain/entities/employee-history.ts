export class EmployeeHistory {
  constructor(
    public startDate: Date,
    public departmentId: string,
    public endDate: Date | null
  ) {}
}
