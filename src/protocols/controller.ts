import { HttpResponses } from "./http-responses";

export abstract class Controller<T> {
  abstract execute(body: T): Promise<HttpResponses>;
}
