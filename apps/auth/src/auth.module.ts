import { HealthCheckModule } from "./../../../libs/health-check/src/health-check.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module, ClassSerializerInterceptor } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity, UsersLibModule } from "@app/users";
import { AuthController } from "./auth.controller";
import { AuthLibModule } from "@app/auth";
import * as Joi from "@hapi/joi";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { RmqModule } from "@app/rmq";
import { RoleEntity } from "@app/users/entities/role.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ["./apps/auth/.env"],
      validationSchema: Joi.object({
        ENV: Joi.string().required(),
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_DIALECT: Joi.string().required().equal("postgres"),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_MAILER_QUEUE: Joi.string().required(),
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
          entities: [UserEntity, RoleEntity],
        };
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    RmqModule.register({
      name: "MAILER",
    }),
    RmqModule.register({
      name: "TOKEN",
    }),
    RmqModule.register({
      name: "SKILLTEST",
    }),
    AuthLibModule,
    UsersLibModule,
    HealthCheckModule.register({
      serviceName: "auth",
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AuthModule {}
