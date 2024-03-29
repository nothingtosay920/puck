import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import * as session from 'express-session';
import * as Store from 'connect-redis';
import { redis } from './redis/redis';

const RedisStore = Store(session)
const store = new RedisStore({client: redis})
async function bootstrap() {
  
  const app = await NestFactory.create(AppModule)
  app.use(
    session({
      store: store,
      secret: 'nothingtosay920',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV == 'production',
        httpOnly: true,
        path: '/',
        maxAge: 1000*60*60*24*7
      }
    })
  )
  app.use(cookieParser())
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(8080);
}
bootstrap();
export default store