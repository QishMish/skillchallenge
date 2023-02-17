import { RmqService } from '@app/rmq';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqOptions, } from '@nestjs/microservices';
import { MailerModule } from './mailer.module';
import * as cookieParser from "cookie-parser";

async function bootstrap() {

  const app = await NestFactory.create(MailerModule);
  
  app.setGlobalPrefix('api/mailer');
  
  const rmqService = app.get<RmqService>(RmqService);
  const configService = app.get(ConfigService)
  
  app.connectMicroservice<RmqOptions>(rmqService.getOptions('MAILER', true));
  app.use(cookieParser());
  
  await app.startAllMicroservices()
  await app.listen(configService.get('PORT'))
}
bootstrap();
