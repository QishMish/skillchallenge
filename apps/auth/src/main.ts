import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import * as cookieParser from 'cookie-parser';
import { RmqService } from '@app/rmq';
import { ConfigService } from '@nestjs/config';
import { RmqOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService)
  app.setGlobalPrefix('auth');
  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(configService.get('PORT'));
  // const app = await NestFactory.create(AuthModule);
  // app.setGlobalPrefix('auth');
  // app.use(cookieParser());
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // const rmqService = app.get<RmqService>(RmqService);
  // const configService = app.get(ConfigService)
  // app.connectMicroservice<RmqOptions>(rmqService.getOptions('MAILER', true));
  // await app.startAllMicroservices()
  // await app.listen(configService.get('PORT'))

}

bootstrap()