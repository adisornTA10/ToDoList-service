export enum ResponseType {
    CD2000 = 'Success',
    CD2001 = 'Data not found',
    CD5000 = 'Error',
    CD5101 = 'Query Data Exception',
  }
  
  export class ResponseTypeUtils {
    static getValue(type: ResponseType): string {
      return type;
    }
  }
  