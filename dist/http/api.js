"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.latestRecommendApi = void 0;
const http_1 = require("./http");
const latestRecommendApi = () => {
    return (0, http_1.default)('/api/latest');
};
exports.latestRecommendApi = latestRecommendApi;
//# sourceMappingURL=api.js.map