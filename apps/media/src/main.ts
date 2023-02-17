import { RmqService } from "@app/rmq";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { RmqOptions } from "@nestjs/microservices";
import { MediaModule } from "./media.module";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(MediaModule);

  app.setGlobalPrefix("api/media");

  const rmqService = app.get<RmqService>(RmqService);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.connectMicroservice<RmqOptions>(rmqService.getOptions("MEDIA", true));
  app.use(cookieParser());

  await app.startAllMicroservices();
  await app.listen(configService.get("PORT"));
}
bootstrap();
