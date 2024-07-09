declare const httpGet: (url: string) => Promise<Response>;
declare const httpPost: (url: string, body: unknown, header?: unknown) => Promise<any>;
export { httpGet, httpPost };
