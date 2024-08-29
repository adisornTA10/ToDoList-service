import { ResponseHeader } from '../bean/response-header';
import { ResponseType, ResponseTypeUtils } from '../constant/type/response-type';

export class ResponseBase {
  header: ResponseHeader;

  constructor(header?: ResponseHeader) {
    this.header = header || new ResponseHeader();
  }

  getHeader(): ResponseHeader {
    return this.header;
  }

  setHeader(header: ResponseHeader): void {
    this.header = header;
  }

  throwExceptionIfError<T extends ResponseBase>(): T {
    if (!ResponseTypeUtils.getValue(ResponseType.CD2000).includes(this.header.desc)) {
      throw new Error(this.header.desc);
    }
    return this as unknown as T;
  }
}
