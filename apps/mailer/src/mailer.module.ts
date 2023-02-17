import { ConfigModule } from "@nestjs/config";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MailerController } from "./mailer.controller";
import { MailerLibModule } from "@app/mail";
import { RmqModule } from "@app/rmq";
import * as Joi from "joi";
import { HealthCheckModule } from "@app/health-check";
import { AuthMiddleware, AuthRpcModule, JwtAuthGuard } from "@app/auth-rpc";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ["./apps/mailer/.env"],
      validationSchema: Joi.object({
        ENV: Joi.string().required(),
        PORT: Joi.number().required(),
        REDIS_PORT: Joi.number().required(),
        EMAIL_HOST: Joi.string().required(),
        EMAIL_PORT: Joi.number().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        EMAIL_FROM: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_MAILER_QUEUE: Joi.string().required(),
      }),
    }),
    MailerLibModule,
    RmqModule.register({ name: "MAILER" }),
    HealthCheckModule.register({
      serviceName: "mailer",
    }),
    AuthRpcModule,
  ],
  controllers: [MailerController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class MailerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("*");
  }
}
