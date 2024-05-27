import { Controller } from "@/protocols/controller";
import { HttpResponses } from "@/protocols/http-responses";

type ByIdParameter = {
  id: string;
};

export class DeleteEmployeeController implements Controller<ByIdParameter> {
  constructor(private repository: any) {}

  async execute(request: ByIdParameter) {
    try {
      const response = await this.repository.deleteById(request.id);
      if (!response) {
        return HttpResponses.NotFound();
      }

      return HttpResponses.OK(response);
    } catch (error: any) {
      return HttpResponses.InternalError(error.message);
    }
  }
}
