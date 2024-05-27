import { HttpResponses } from "./http-responses";

export abstract class Controller<T = undefined> {
  abstract execute(body: T): Promise<HttpResponses>;
}
