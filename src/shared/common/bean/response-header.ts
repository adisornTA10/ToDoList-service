export class ResponseHeader {
    code: string;
    desc: string;
  
    constructor(code: string = '', desc: string = '') {
      this.code = code;
      this.desc = desc;
    }
  
    setCode(code: string): void {
      this.code = code;
    }
  
    setDesc(desc: string): void {
      this.desc = desc;
    }
  }
  