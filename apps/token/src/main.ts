import { RmqService } from '@app/rmq';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqOptions } from '@nestjs/microservices';
import { TokenModule } from './token.module';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(TokenModule);

  app.setGlobalPrefix('api/token');

  const rmqService = app.get<RmqService>(RmqService);
  const configService = app.get(ConfigService)

  app.connectMicroservice<RmqOptions>(rmqService.getOptions('TOKEN', true));
  app.use(cookieParser());

  await app.startAllMicroservices()
  await app.listen(configService.get('PORT'))

}
bootstrap();
