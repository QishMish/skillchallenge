import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { SkillTestController } from "./skill-test.controller";
import * as Joi from "@hapi/joi";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HealthCheckModule } from "@app/health-check";
import { RmqModule } from "@app/rmq";
import { AuthMiddleware, AuthRpcModule, JwtAuthGuard } from "@app/auth-rpc";
import { APP_GUARD } from "@nestjs/core";
import { SkillTestEntity, SkillTestLibModule } from "@app/skill-test";
import { QuestionController } from "./question.controller";
import { QuestionEntity, QuestionModule } from "@app/question";
import { OptionEntity, OptionModule } from "@app/option";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ["./apps/skill-test/.env"],
      validationSchema: Joi.object({
        ENV: Joi.string().required(),
        PORT: Joi.number().required(),
        DB_HOST: Joi.string().required(),
        DB_DIALECT: Joi.string().required().equal("postgres"),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_SKILLTEST_QUEUE: Joi.string().required(),
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
          entities: [SkillTestEntity, QuestionEntity, OptionEntity],
        };
      },
    }),
    HealthCheckModule.register({
      serviceName: "skilltest",
    }),
    RmqModule.register({
      name: "SKILLTEST",
    }),
    AuthRpcModule,
    SkillTestLibModule,
    QuestionModule,
  ],
  controllers: [SkillTestController, QuestionController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class SkillTestModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("*");
  }
}
