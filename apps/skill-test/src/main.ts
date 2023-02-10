import { NestFactory } from '@nestjs/core';
import { SkillTestModule } from './skill-test.module';

async function bootstrap() {
  const app = await NestFactory.create(SkillTestModule);
  await app.listen(3000);
}
bootstrap();
