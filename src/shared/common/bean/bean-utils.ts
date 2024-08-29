export class BeanUtils {
    static getDefaultValueIfNull<T>(value: T | null | undefined, defaultValue: T): T {
      return value != null ? value : defaultValue;
    }
  
    static isEmpty(value: any): boolean {
      if (value == null) {
        return true;
      }
  
      if (typeof value === 'string' && value.trim().length === 0) {
        return true;
      }
  
      if (Array.isArray(value) && value.length === 0) {
        return true;
      }
  
      if (value instanceof Map || value instanceof Set) {
        return value.size === 0;
      }
  
      if (value instanceof Object && Object.keys(value).length === 0) {
        return true;
      }
  
      return false;
    }
  
    static isNotEmpty(value: any): boolean {
      return !this.isEmpty(value);
    }
  
    static isNull(value: any): boolean {
      return value == null;
    }
  
    static isNotNull(value: any): boolean {
      return !this.isNull(value);
    }
  
    static toString(value: any): string {
      return this.isNotNull(value) ? value.toString() : '';
    }
  }
  