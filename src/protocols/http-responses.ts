export class HttpResponses {
  constructor(public code: number, public message: any) {}

  static OK(data: any): HttpResponses {
    return new HttpResponses(200, data);
  }

  static InternalError(message: string): HttpResponses {
    return new HttpResponses(500, message);
  }
}
