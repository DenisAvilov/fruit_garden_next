import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { DbModule } from 'src/db/db.module';
import { CookieService } from 'src/auth/cookie.service';

@Module({
  imports: [DbModule],
  controllers: [AccountController],
  providers: [AccountService, CookieService],
  exports: [AccountService]
})
export class AccountModule {}


