import { Module } from '@nestjs/common';
import { ConfigModule, registerAs } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';

const tokenConfig = registerAs('utils', () => ({
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION_TIME: +process.env.JWT_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME:
    +process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
}));


@Module({
  imports: [ConfigModule.forFeature(tokenConfig), JwtModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenLibModule {}
