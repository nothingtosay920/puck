"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pretreatment = void 0;
const redis_1 = require("../redis/redis");
async function Pretreatment(req, res, next) {
    console.log(req.session);
    const uid = await redis_1.redis.get(req.session['uid']);
    const cid = await redis_1.redis.get(req.session['cid']);
    req.session['uid'] = uid;
    req.session['cid'] = cid;
    next();
}
exports.Pretreatment = Pretreatment;
//# sourceMappingURL=middleware.js.map