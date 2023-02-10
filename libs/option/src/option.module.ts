import { Module } from '@nestjs/common';
import { OptionService } from './option.service';

@Module({
  providers: [OptionService],
  exports: [OptionService],
})
export class OptionModule {}
