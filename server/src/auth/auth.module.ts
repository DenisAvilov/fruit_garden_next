import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { CookieService } from './cookie.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';

import { DbService } from 'src/db/db.service';

@Module({
  imports: [UsersModule, JwtModule.register({
    global: true,
    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    signOptions: {},
  }),
],
  controllers: [AuthController],
  providers: [DbService, AuthService, PasswordService, CookieService, TokenService],
})
export class AuthModule {}


