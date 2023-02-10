import { Injectable } from '@nestjs/common';

@Injectable()
export class SkillTestService {
  getHello(): string {
    return 'Hello World!';
  }
}
