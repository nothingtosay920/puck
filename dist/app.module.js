"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const apollo_1 = require("@nestjs/apollo");
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const app_resolver_1 = require("./app.resolver");
const app_service_1 = require("./app.service");
const article_module_1 = require("./article/article.module");
const auth_module_1 = require("./auth/auth.module");
const label_module_1 = require("./label/label.module");
const category_module_1 = require("./category/category.module");
const recommend_module_1 = require("./recommend/recommend/recommend.module");
const schedule_1 = require("@nestjs/schedule");
const task_module_1 = require("./task/task.module");
const emit_module_1 = require("./emit/emit.module");
const statusMonitor_1 = require("./statusMonitor");
const nestjs_status_monitor_1 = require("nestjs-status-monitor");
const search_module_1 = require("./search/search.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            axios_1.HttpModule,
            article_module_1.ArticleModule,
            auth_module_1.AuthModule,
            label_module_1.LabelModule,
            category_module_1.CategoryModule,
            recommend_module_1.RecommendModule,
            schedule_1.ScheduleModule.forRoot(),
            task_module_1.TasksModule,
            emit_module_1.EmitModule,
            nestjs_status_monitor_1.StatusMonitorModule.forRoot(statusMonitor_1.default),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: 'schema.gql',
                context: ({ req, res }) => ({ req, res }),
                cors: {
                    origin: 'http://localhost:3000',
                    credentials: true,
                },
            }),
            search_module_1.SearchModule
        ],
        providers: [app_service_1.AppService, app_resolver_1.AppResolver],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map