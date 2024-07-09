"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpPost = exports.httpGet = void 0;
const httpGet = async (url) => {
    const r = await fetch(url);
    return r;
};
exports.httpGet = httpGet;
const httpPost = async (url, body, header) => {
    const defaultHeader = {
        "Content-Type": " application/x-www-form-urlencoded",
        accept: "application/json",
    };
    const request = new Request(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: header && defaultHeader,
    });
    return await (await fetch(request)).json();
};
exports.httpPost = httpPost;
//# sourceMappingURL=fetch-ml.httpLayer.js.map