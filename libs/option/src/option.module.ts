import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OptionEntity } from "./entities";
import { OptionRepository } from "./option.repository";
import { OptionService } from "./option.service";

@Module({
  imports: [TypeOrmModule.forFeature([OptionEntity])],
  providers: [OptionService, OptionRepository],
  exports: [OptionService, OptionRepository],
})
export class OptionModule {}
