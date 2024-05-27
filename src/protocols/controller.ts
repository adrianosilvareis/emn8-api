import { HttpResponses } from "./http-responses";

export abstract class Controller {
  abstract execute(): Promise<HttpResponses>;
}
