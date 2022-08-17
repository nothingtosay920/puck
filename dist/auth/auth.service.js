"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const nanoid_1 = require("nanoid");
const main_1 = require("../main");
const user_service_1 = require("../recommend/user/user.service");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, recommendUserService) {
        this.usersService = usersService;
        this.recommendUserService = recommendUserService;
    }
    async Login(phone, context) {
        let user = await this.usersService.findOneByPhone(phone);
        if (!user) {
            const openId = (0, nanoid_1.nanoid)();
            user = await this.usersService.create({
                phone: phone,
                name: (0, nanoid_1.nanoid)(),
                uuid_user: (0, nanoid_1.nanoid)(),
                user_img: "https://ending-homework.oss-cn-beijing.aliyuncs.com/avtar.png",
                open_id: openId,
                user_role: {
                    create: {
                        role: "USER"
                    }
                }
            });
            await this.recommendUserService.insertUser({
                UserId: openId,
                Labels: ['前端', 'react.js']
            });
        }
        context.req.session['uid'] = user.uuid_user;
        return {
            code: '200',
            message: "创建成功"
        };
    }
    async LogOut(context) {
        const session = context.req.sessionID;
        context.res.clearCookie('connect.sid');
        main_1.default.destroy(session);
        return {
            code: 200
        };
    }
    async getUserData(context) {
        const uid = context.req.session['uid'];
        if (uid) {
            return await this.usersService.findOne(uid);
        }
        return {};
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        user_service_1.RcommendUserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map