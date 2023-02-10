import { HealthCheckModule } from "./../../../libs/health-check/src/health-check.module";
import { ConfigModule } from "@nestjs/config";
import { AuthorizationMiddleware } from "./middlewares";
import { MiddlewareConsumer, NestModule } from "@nestjs/common";
import { Module } from "@nestjs/common";
import * as Joi from "joi";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ["./apps/api-gateway/.env"],
      validationSchema: Joi.object({
        ENV: Joi.string().required(),
        PORT: Joi.number().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_MAILER_QUEUE: Joi.string().required(),
        PROXY_CONFIG: Joi.string().required(),
      }),
    }),
    HealthCheckModule.register({
      serviceName: "api_gateway",
    }),
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
