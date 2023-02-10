import { HealthCheckModule } from "@app/health-check";
import { RmqModule } from "@app/rmq";
import { TokenLibModule } from "@app/token";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { TokenController } from "./token.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ["./apps/token/.env"],
      validationSchema: Joi.object({
        ENV: Joi.string().required(),
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_TOKEN_QUEUE: Joi.string().required(),
      }),
    }),
    TokenLibModule,
    RmqModule.register({ name: "TOKEN" }),
    HealthCheckModule.register({
      serviceName: "token",
    }),
  ],
  controllers: [TokenController],
  providers: [],
})
export class TokenModule {}
