"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const ioredis_1 = require("ioredis");
exports.redis = new ioredis_1.default(process.env.REDIS_URL);
//# sourceMappingURL=redis.js.map