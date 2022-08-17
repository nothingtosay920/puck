"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const Store = require("connect-redis");
const redis_1 = require("./redis/redis");
const RedisStore = Store(session);
const store = new RedisStore({ client: redis_1.redis });
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(session({
        store: store,
        secret: 'nothingtosay920',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV == 'production',
            httpOnly: true,
            path: '/',
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    }));
    app.use(cookieParser());
    app.enableCors({
        origin: 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Accept',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(8080);
}
bootstrap();
exports.default = store;
//# sourceMappingURL=main.js.map