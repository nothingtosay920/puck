"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = require("node-fetch");
let baseURL = process.env.RECOMMEND_SERVICE, inital = {
    method: 'GET',
    params: null,
    body: null,
    headers: {
        accept: "application/json",
        "Content-Type": "application/json"
    },
    cache: 'no-cache',
    credentials: 'include',
    responseType: 'JSON'
};
function request(url, config) {
    if (typeof url !== 'string')
        throw new TypeError('url must be required and of string type');
    config = Object.assign({}, inital, config);
    let { method, body, responseType } = config;
    url = baseURL + url;
    if (/^(POST|PUT|PATCH)$/i.test(method) && body != null)
        config.body = body;
    return (0, node_fetch_1.default)(url, config).then(response => {
        let { status, statusText } = response;
        if (status >= 200 && status < 400) {
            let result;
            switch (responseType.toUpperCase()) {
                case 'JSON':
                    result = response.json();
                    break;
                case 'TEXT':
                    result = response.text();
                    break;
                case 'BLOB':
                    result = response.blob();
                    break;
                case 'ARRAYBUFFER':
                    result = response.arrayBuffer();
                    break;
            }
            return result;
        }
        return Promise.reject({
            code: 'STATUS ERROR',
            status,
            statusText
        });
    }).catch(reason => {
        if (reason && reason.code === 'STATUS ERROR') {
            switch (reason.status) {
                case 400:
                    return "400";
                case 401:
                    return "401";
                case 404:
                    return "404";
            }
        }
        else if (!navigator.onLine) {
            return "网络中断";
        }
        else {
            return "请求被终止";
        }
        return Promise.reject(reason);
    });
}
exports.default = request;
;
//# sourceMappingURL=http.js.map