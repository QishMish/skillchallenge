import { Controller, Get } from "@nestjs/common";

@Controller("status")
export class HealthController {
  @Get("/")
  public getStatus() {
    return {
      status: 200,
      msg: "ok",
    };
  }
}
