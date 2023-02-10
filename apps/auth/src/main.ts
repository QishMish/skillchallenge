import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AuthModule } from "./auth.module";
import * as cookieParser from "cookie-parser";
import { RmqService } from "@app/rmq";
import { ConfigService } from "@nestjs/config";
import { RmqOptions } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.setGlobalPrefix("api/auth");
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser());

  const rmqService = app.get<RmqService>(RmqService);
  const configService = app.get(ConfigService);

  app.connectMicroservice<RmqOptions>(rmqService.getOptions("AUTH", true));

  await app.startAllMicroservices();
  await app.listen(configService.get("PORT"));

}

bootstrap();
