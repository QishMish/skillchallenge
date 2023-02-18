import { NestFactory } from "@nestjs/core";
import { SkillTestModule } from "./skill-test.module";
import * as cookieParser from "cookie-parser";
import { RmqOptions } from "@nestjs/microservices";
import { RmqService } from "@app/rmq";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(SkillTestModule);
  
  app.setGlobalPrefix("api/skilltest");
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser());

  const rmqService = app.get<RmqService>(RmqService);
  const configService = app.get(ConfigService);

  // app.connectMicroservice<RmqOptions>(rmqService.getOptions("SKILLTEST", true));
 
  await app.startAllMicroservices();
  await app.listen(configService.get("PORT"));
}
bootstrap();
