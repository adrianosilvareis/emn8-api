export abstract class DeleteEmployeeUseCase {
  abstract deleteById(id: string): Promise<boolean>;
}
