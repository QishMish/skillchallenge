import { HealthCheckModule } from "@app/health-check";
import { RmqModule } from "@app/rmq";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MediaController } from "./media.controller";
import * as Joi from "joi";
import { MediaEntity, MediaLibModule } from "@app/media";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthMiddleware, AuthRpcModule } from "@app/auth-rpc";
import { MiddlewareConsumer, NestModule } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "@app/auth-rpc";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ["./apps/media/.env"],
      validationSchema: Joi.object({
        ENV: Joi.string().required(),
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_DIALECT: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_MEDIA_QUEUE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: "postgres",
          host: configService.get("DB_HOST"),
          port: configService.get("DB_PORT"),
          username: configService.get("DB_USER"),
          password: configService.get("DB_PASWORD"),
          database: configService.get("DB_NAME"),
          synchronize: true,
          logging:
            configService.get("NODE_ENV") === "development" ? true : false,
          entities: [MediaEntity],
        };
      },
    }),
    MediaLibModule,
    RmqModule.register({ name: "MEDIA" }),
    HealthCheckModule.register({
      serviceName: "media",
    }),
    AuthRpcModule,
  ],
  controllers: [MediaController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class MediaModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("*");
  }
}
