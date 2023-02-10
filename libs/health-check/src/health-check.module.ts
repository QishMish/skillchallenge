import {
  ConfigureHealthController,
  HealthControllerOptions,
} from "./health-check.controller.";
import { DynamicModule } from "@nestjs/common";
import { Module } from "@nestjs/common";

@Module({})
export class HealthCheckModule {
  static register({ serviceName }: HealthControllerOptions): DynamicModule {
    return {
      module: HealthCheckModule,
      controllers: [
        ConfigureHealthController({
          serviceName: serviceName,
        }),
      ],
      exports: [],
    };
  }
}
