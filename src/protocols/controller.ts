import { HttpResponses } from "./http-responses";

export abstract class Controller {
  abstract execute<T>(body: T): Promise<HttpResponses>;
}
