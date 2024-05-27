import { Controller } from "@/protocols/controller";
import { HttpResponses } from "@/protocols/http-responses";
import { GetAllDepartmentRepository } from "../repositories/get-all-department.repository";

export class GetAllDepartmentController implements Controller {
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
