import { HttpResponses } from "@/protocols/http-responses";
import { GetAllDepartmentRepository } from "../repositories/get-all-departments.repository";

export class GetAllDepartmentController {
  constructor(
    private readonly departmentRepository: GetAllDepartmentRepository
  ) {}

  async execute(): Promise<HttpResponses> {
    try {
      const list = await this.departmentRepository.getAll();
      return HttpResponses.OK(list);
    } catch (error: any) {
      return HttpResponses.InternalError(error.message);
    }
  }
}
