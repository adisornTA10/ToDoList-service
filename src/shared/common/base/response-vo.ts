// src/common/base/response-vo.ts
import { ResponseBase } from './response-base';
import { ResponseHeader } from '../bean/response-header';

export class ResponseVo<T> extends ResponseBase {
  private data: T;

  constructor(data?: T, header?: ResponseHeader) {
    super(header);
    this.data = data;
  }

  getData(): T {
    return this.data;
  }

  setData(data: T): void {
    this.data = data;
  }
}
