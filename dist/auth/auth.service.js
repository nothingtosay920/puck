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
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async Login(phone, context) {
        let user = await this.usersService.findOneByPhone(phone);
        if (!user) {
            user = await this.usersService.create({
                phone: phone,
                name: (0, nanoid_1.nanoid)(),
                uuid_user: (0, nanoid_1.nanoid)(),
                open_id: (0, nanoid_1.nanoid)(),
                user_role: {
                    create: {
                        role: "USER"
                    }
                }
            });
        }
        context.req.session['uid'] = user.uuid_user;
        return {
            code: '200',
            message: "创建成功"
        };
    }
    async getUserData(context) {
        const uid = context.req.session['uid'];
        if (uid) {
            const user = await this.usersService.findOne(uid);
            return {
                data: {
                    name: user.name
                }
            };
        }
        else {
            throw new Error('session非法');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map