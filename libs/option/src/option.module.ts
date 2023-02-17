import { Module } from "@nestjs/common";
import { OptionRepository } from "./option.repository";
import { OptionService } from "./option.service";

@Module({
  providers: [OptionService, OptionRepository],
  exports: [OptionService, OptionRepository],
})
export class OptionModule {}
