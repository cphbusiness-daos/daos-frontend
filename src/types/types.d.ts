/* eslint-disable @typescript-eslint/no-explicit-any */
export declare global {
  interface JSON {
    parse<T = unknown>(
      text: string,
      reviver?: (this: any, key: string, value: any) => any,
    ): T;
  }
}
