"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitModule = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const app_service_1 = require("../app.service");
const emit_resolver_1 = require("./emit.resolver");
const emit_service_1 = require("./emit.service");
const listener_1 = require("./listener");
let EmitModule = class EmitModule {
};
EmitModule = __decorate([
    (0, common_1.Module)({
        providers: [
            app_service_1.AppService,
            emit_resolver_1.EmitResolver,
            listener_1.ListenerService,
            emit_service_1.EmitService,
            event_emitter_1.EventEmitter2
        ],
    })
], EmitModule);
exports.EmitModule = EmitModule;
//# sourceMappingURL=emit.module.js.map