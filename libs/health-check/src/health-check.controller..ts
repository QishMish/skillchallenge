import { Controller, Get } from "@nestjs/common";

export interface HealthControllerOptions {
  serviceName: string;
}

type HealthControllerType = { new (...args: any[]): any };

export function ConfigureHealthController(
  options: HealthControllerOptions
): HealthControllerType {
  @Controller("status")
  class HealthController {
    @Get("/")
    public getStatus() {
      return {
        status: 200,
        msg: "ok",
        sevice: options.serviceName,
      };
    }
  }

  return HealthController;
}
