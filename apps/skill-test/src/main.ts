import { NestFactory } from '@nestjs/core';
import { SkillTestModule } from './skill-test.module';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(SkillTestModule);
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
